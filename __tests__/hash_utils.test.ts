import { createHash } from 'crypto';

import { AkuratecoHashUtils } from '../src/utils/hash_utils';
import { AkuratecoOrder } from '../src/models/akurateco_order';

function nodeCheckoutHash(toMd5: string): string {
  const upper = toMd5.toUpperCase();
  const md5Hex = createHash('md5').update(upper, 'utf8').digest('hex');
  return createHash('sha1').update(md5Hex, 'utf8').digest('hex');
}

describe('AkuratecoHashUtils', () => {
  test('generateCheckoutHash matches node crypto implementation', () => {
    const order = new AkuratecoOrder({
      number: 'ORDER-123',
      amount: '10.50',
      currency: 'USD',
      description: 'Test purchase',
    });

    const password = 'secret';

    const toMd5 = `${order.number}${order.amount}${order.currency}${order.description}${password}`;
    const expected = nodeCheckoutHash(toMd5);

    expect(AkuratecoHashUtils.generateCheckoutHash({ order, password })).toBe(expected);
  });

  test('generatePaymentIdHash matches node crypto implementation', () => {
    const id = 'payment_1';
    const password = 'secret';

    const expected = nodeCheckoutHash(`${id}${password}`);
    expect(AkuratecoHashUtils.generatePaymentIdHash({ id, password })).toBe(expected);
  });

  test('generateRefundHash matches node crypto implementation', () => {
    const paymentId = 'payment_1';
    const amount = '1.00';
    const password = 'secret';

    const expected = nodeCheckoutHash(`${paymentId}${amount}${password}`);
    expect(AkuratecoHashUtils.generateRefundHash({ paymentId, amount, password })).toBe(expected);
  });

  test('hash is case-insensitive for input concatenation', () => {
    const orderA = new AkuratecoOrder({
      number: 'order-abc',
      amount: '10',
      currency: 'usd',
      description: 'hello',
    });

    const orderB = new AkuratecoOrder({
      number: 'ORDER-ABC',
      amount: '10',
      currency: 'USD',
      description: 'HELLO',
    });

    const password = 'secret';

    expect(AkuratecoHashUtils.generateCheckoutHash({ order: orderA, password })).toBe(
      AkuratecoHashUtils.generateCheckoutHash({ order: orderB, password }),
    );
  });
});
