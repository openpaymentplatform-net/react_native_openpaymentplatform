import { AkuratecoOrder } from '../src/models/akurateco_order';
import { CheckStatusResult } from '../src/models/check_status_model';
import { AkuratecoVoid } from '../src/models/akurateco_void';
import { PaymentStatus } from '../src/models/enums';

describe('Models', () => {
  test('AkuratecoOrder.isValid validates required fields', () => {
    const ok = new AkuratecoOrder({
      number: 'ORDER-1',
      amount: '10.00',
      currency: 'USD',
      description: 'Some product',
    });

    expect(ok.isValid()).toBe(true);

    const badCurrency = new AkuratecoOrder({
      number: 'ORDER-1',
      amount: '10.00',
      currency: 'usd',
      description: 'Some product',
    });
    expect(badCurrency.isValid()).toBe(false);

    const badAmount = new AkuratecoOrder({
      number: 'ORDER-1',
      amount: '0',
      currency: 'USD',
      description: 'Some product',
    });
    expect(badAmount.isValid()).toBe(false);

    const badDescription = new AkuratecoOrder({
      number: 'ORDER-1',
      amount: '10.00',
      currency: 'USD',
      description: 'x',
    });
    expect(badDescription.isValid()).toBe(false);
  });

  test('CheckStatusResult maps status and keys correctly', () => {
    const json = {
      payment_id: 'p_1',
      date: '2020-01-01T00:00:00Z',
      status: '3ds',
      reason: null,
      recurring_token: 'rt_1',
      schedule_id: 'sch_1',
      order: {
        number: 'ORDER-1',
        amount: '10.00',
        currency: 'USD',
        description: 'Some product',
      },
    };

    const model = CheckStatusResult.fromJson(json);

    expect(model.paymentId).toBe('p_1');
    expect(model.status).toBe(PaymentStatus.require3ds);
    expect(model.recurringToken).toBe('rt_1');
    expect(model.sheduleId).toBe('sch_1');

    const out = model.toJson();
    expect(out.payment_id).toBe('p_1');
    expect(out.status).toBe('3ds');
    expect(out.schedule_id).toBe('sch_1');
    expect(out.order).toEqual(json.order);
  });

  test('AkuratecoVoid roundtrips JSON mapping', () => {
    const json = {
      status: 'void',
      payment_id: 'p_1',
      date: '2020-01-01T00:00:00Z',
      reason: 'customer_request',
      order: {
        number: 'ORDER-1',
        amount: '10.00',
        currency: 'USD',
        description: 'Some product',
      },
    };

    const model = AkuratecoVoid.fromJson(json);
    expect(model.status).toBe(PaymentStatus.voided);
    expect(model.paymentId).toBe('p_1');

    const out = model.toJson();
    expect(out.status).toBe('void');
    expect(out.payment_id).toBe('p_1');
    expect(out.order).toEqual(json.order);
  });
});
