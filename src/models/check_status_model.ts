import { OpenPaymentPlatformOrder } from './openpaymentplatform_order';
import { Customer } from './customer';
import { PaymentStatus, statusToString, stringToStatus } from './enums';

/**
 * Parsed response from the backend payment status endpoint.
 */
export class CheckStatusResult {
  readonly paymentId: string;
  readonly date: Date;
  readonly status: PaymentStatus;
  readonly reason?: string | null;
  readonly recurringToken?: string | null;
  readonly sheduleId?: string | null;
  readonly order: OpenPaymentPlatformOrder;
  readonly customer?: Customer | null;

  constructor(args: {
    paymentId: string;
    date: Date;
    status: PaymentStatus;
    reason?: string | null;
    recurringToken?: string | null;
    sheduleId?: string | null;
    order: OpenPaymentPlatformOrder;
    customer?: Customer | null;
  }) {
    this.paymentId = args.paymentId;
    this.date = args.date;
    this.status = args.status;
    this.reason = args.reason ?? null;
    this.recurringToken = args.recurringToken ?? null;
    this.sheduleId = args.sheduleId ?? null;
    this.order = args.order;
    this.customer = args.customer ?? null;
  }

  /**
   * Creates an instance from a backend JSON payload.
   */
  static fromJson(json: any): CheckStatusResult {
    return new CheckStatusResult({
      paymentId: json?.['payment_id'],
      date: new Date(Date.parse(json?.['date'])),
      status: stringToStatus(json?.['status']),
      reason: json?.['reason'],
      recurringToken: json?.['recurring_token'],
      sheduleId: json?.['schedule_id'],
      order: OpenPaymentPlatformOrder.fromJson(json?.['order']),
      customer: json?.['customer'] != null ? Customer.fromJson(json?.['customer']) : null,
    });
  }

  /**
   * Serializes the model back to backend JSON format.
   */
  toJson(): Record<string, any> {
    return {
      payment_id: this.paymentId,
      date: this.date.toISOString(),
      status: statusToString(this.status),
      reason: this.reason ?? null,
      recurring_token: this.recurringToken ?? null,
      schedule_id: this.sheduleId ?? null,
      order: this.order.toJson(),
      ...(this.customer != null ? { customer: this.customer.toJson() } : {}),
    };
  }
}
