import { createHash } from 'crypto';

import { HttpServiceService } from '../src/http/http_service';
import { Akurateco } from '../src/akurateco';
import { AkuratecoRequest, AkuratecoOperation } from '../src/models/checkout/akurateco_request';
import { AkuratecoOrder } from '../src/models/akurateco_order';
import {
  PaymentBackendException,
  PaymentInitializationException,
} from '../src/exceptions/exceptions';
import { PaymentStatus } from '../src/models/enums';

function nodeCheckoutHash(toMd5: string): string {
  const upper = toMd5.toUpperCase();
  const md5Hex = createHash('md5').update(upper, 'utf8').digest('hex');
  return createHash('sha1').update(md5Hex, 'utf8').digest('hex');
}

function mockFetchOnce(args: { status: number; bodyText: string }) {
  (globalThis as any).fetch = jest.fn(async () => ({
    status: args.status,
    text: async () => args.bodyText,
  }));
}

describe('HttpServiceService', () => {
  const backendUrl = 'https://backend.example';
  const merchantKey = 'merchant_key_1';

  beforeEach(() => {
    jest.resetAllMocks();
    Akurateco.instance.password = 'password_123';
  });

  test('fetchPaymentUrl posts merged payload and returns redirect_url', async () => {
    const order = new AkuratecoOrder({
      number: 'N-1',
      amount: '10.00',
      currency: 'USD',
      description: 'My order',
    });

    const request = new AkuratecoRequest({
      operation: AkuratecoOperation.purchase,
      successUrl: 'https://example.com/success',
      order,
    });

    mockFetchOnce({ status: 200, bodyText: JSON.stringify({ redirect_url: 'https://pay.example' }) });

    const service = new HttpServiceService(backendUrl, merchantKey);
    const url = await service.fetchPaymentUrl(request);

    expect(url).toBe('https://pay.example');

    expect((globalThis as any).fetch).toHaveBeenCalledTimes(1);
    const [calledUrl, init] = (globalThis as any).fetch.mock.calls[0];

    expect(calledUrl).toBe(`${backendUrl}/api/v1/session`);
    expect(init.method).toBe('POST');

    const posted = JSON.parse(init.body);
    expect(posted.merchant_key).toBe(merchantKey);

    const toMd5 = `${order.number}${order.amount}${order.currency}${order.description}${Akurateco.instance.password}`;
    expect(posted.hash).toBe(nodeCheckoutHash(toMd5));

    // ensure base request fields are present
    expect(posted.operation).toBe('purchase');
    expect(posted.success_url).toBe('https://example.com/success');
    expect(posted.order).toEqual(order.toJson());
  });

  test('fetchPaymentUrl throws PaymentBackendException when redirect_url missing', async () => {
    const order = new AkuratecoOrder({
      number: 'N-1',
      amount: '10.00',
      currency: 'USD',
      description: 'My order',
    });

    const request = new AkuratecoRequest({
      operation: AkuratecoOperation.purchase,
      successUrl: 'https://example.com/success',
      order,
    });

    mockFetchOnce({ status: 200, bodyText: JSON.stringify({}) });

    const service = new HttpServiceService(backendUrl, merchantKey);

    await expect(service.fetchPaymentUrl(request)).rejects.toBeInstanceOf(PaymentBackendException);
  });

  test('non-200 response becomes PaymentBackendException with status/body', async () => {
    mockFetchOnce({ status: 500, bodyText: 'oops' });

    const service = new HttpServiceService(backendUrl, merchantKey);

    await expect(
      service.checkStatus({ paymentId: 'p_1' }),
    ).rejects.toMatchObject({ name: 'PaymentBackendException', response: { status: 500, body: 'oops' } });
  });

  test('network failure becomes PaymentInitializationException', async () => {
    (globalThis as any).fetch = jest.fn(async () => {
      throw new Error('network down');
    });

    const service = new HttpServiceService(backendUrl, merchantKey);

    await expect(service.checkStatus({ paymentId: 'p_1' })).rejects.toBeInstanceOf(
      PaymentInitializationException,
    );
  });

  test('checkStatus calls status endpoint and parses status', async () => {
    const order = new AkuratecoOrder({
      number: 'N-1',
      amount: '10.00',
      currency: 'USD',
      description: 'My order',
    });

    mockFetchOnce({
      status: 200,
      bodyText: JSON.stringify({
        payment_id: 'p_1',
        date: '2020-01-01T00:00:00Z',
        status: 'settled',
        order: order.toJson(),
      }),
    });

    const service = new HttpServiceService(backendUrl, merchantKey);
    const res = await service.checkStatus({ paymentId: 'p_1' });

    expect(res.paymentId).toBe('p_1');
    expect(res.status).toBe(PaymentStatus.settled);

    const [calledUrl, init] = (globalThis as any).fetch.mock.calls[0];
    expect(calledUrl).toBe(`${backendUrl}/api/v1/payment/status`);

    const posted = JSON.parse(init.body);
    expect(posted.merchant_key).toBe(merchantKey);
    expect(posted.payment_id).toBe('p_1');
  });
});
