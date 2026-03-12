import { createHash } from 'crypto';

import { OpenPaymentPlatformHashUtils } from '../src/utils/hash_utils';
import { OpenPaymentPlatformOrder } from '../src/models/openpaymentplatform_order';

function nodeCheckoutHash(toMd5: string): string {
  const upper = toMd5.toUpperCase();
  const md5Hex = createHash('md5').update(upper, 'utf8').digest('hex');
  return createHash('sha1').update(md5Hex, 'utf8').digest('hex');
}

describe('OpenPaymentPlatformHashUtils', () => {
  test('generateCheckoutHash matches node crypto implementation', () => {
    const order = new OpenPaymentPlatformOrder({
      number: 'ORDER-123',
      amount: '10.50',
      currency: 'USD',
      description: 'Test purchase',
    });

    const password = 'secret';

    const toMd5 = `${order.number}${order.amount}${order.currency}${order.description}${password}`;
    const expected = nodeCheckoutHash(toMd5);

    expect(OpenPaymentPlatformHashUtils.generateCheckoutHash({ order, password })).toBe(expected);
  });

  test('generatePaymentIdHash matches node crypto implementation', () => {
    const id = 'payment_1';
    const password = 'secret';

    const expected = nodeCheckoutHash(`${id}${password}`);
    expect(OpenPaymentPlatformHashUtils.generatePaymentIdHash({ id, password })).toBe(expected);
  });

  test('generateRefundHash matches node crypto implementation', () => {
    const paymentId = 'payment_1';
    const amount = '1.00';
    const password = 'secret';

    const expected = nodeCheckoutHash(`${paymentId}${amount}${password}`);
    expect(OpenPaymentPlatformHashUtils.generateRefundHash({ paymentId, amount, password })).toBe(expected);
  });

  test('hash is case-insensitive for input concatenation', () => {
    const orderA = new OpenPaymentPlatformOrder({
      number: 'order-abc',
      amount: '10',
      currency: 'usd',
      description: 'hello',
    });

    const orderB = new OpenPaymentPlatformOrder({
      number: 'ORDER-ABC',
      amount: '10',
      currency: 'USD',
      description: 'HELLO',
    });

    const password = 'secret';

    expect(OpenPaymentPlatformHashUtils.generateCheckoutHash({ order: orderA, password })).toBe(
      OpenPaymentPlatformHashUtils.generateCheckoutHash({ order: orderB, password }),
    );
  });
});
