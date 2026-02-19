import { AkuratecoOrder } from './akurateco_order';
import { PaymentStatus, statusToString, stringToStatus } from './enums';

/**
 * Parsed response from the backend void endpoint.
 */
export class AkuratecoVoid {
  readonly status: PaymentStatus;
  readonly paymentId: string;
  readonly date: Date;
  readonly reason?: string | null;
  readonly order: AkuratecoOrder;

  constructor(args: {
    status: PaymentStatus;
    paymentId: string;
    date: Date;
    reason?: string | null;
    order: AkuratecoOrder;
  }) {
    this.status = args.status;
    this.paymentId = args.paymentId;
    this.date = args.date;
    this.reason = args.reason ?? null;
    this.order = args.order;
  }

  /**
   * Creates an instance from a backend JSON payload.
   */
  static fromJson(json: any): AkuratecoVoid {
    return new AkuratecoVoid({
      status: stringToStatus(json?.['status']),
      paymentId: json?.['payment_id'],
      date: new Date(Date.parse(json?.['date'])),
      reason: json?.['reason'],
      order: AkuratecoOrder.fromJson(json?.['order']),
    });
  }

  /**
   * Serializes the model back to backend JSON format.
   */
  toJson(): Record<string, any> {
    return {
      status: statusToString(this.status),
      payment_id: this.paymentId,
      date: this.date.toISOString(),
      reason: this.reason ?? null,
      order: this.order.toJson(),
    };
  }
}
