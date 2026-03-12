import { OpenPaymentPlatformOrder } from '../openpaymentplatform_order';
import { Customer } from '../customer';
import { BillingAddress } from './billing_address';
import { Payee } from './payee';

/**
 * Operation type for the hosted checkout.
 */
export enum OpenPaymentPlatformOperation {
  purchase = 'purchase',
  debit = 'debit',
  transfer = 'transfer',
}

/**
 * Checkout session creation request.
 *
 * This object is serialized with {@link toJson} and sent to your backend. The
 * backend typically adds merchant data (merchant key) and a signature/hash.
 */
export class OpenPaymentPlatformRequest {
  readonly operation: OpenPaymentPlatformOperation;
  readonly successUrl: string;
  readonly methods?: string[] | null;
  readonly channelId?: string | null;
  readonly sessionExpiry?: number | null;
  readonly cancelUrl?: string | null;
  readonly expiryUrl?: string | null;
  readonly errorUrl?: string | null;
  readonly urlTarget?: string | null;
  readonly reqToken?: boolean | null;
  readonly cardToken?: string[] | null;
  readonly formId?: string | null;
  readonly recurringInit?: boolean | null;
  readonly scheduleId?: string | null;
  readonly vatCalc?: boolean | null;
  readonly order: OpenPaymentPlatformOrder;
  readonly customer?: Customer | null;
  readonly billingAddress?: BillingAddress | null;
  readonly payee?: Payee | null;
  readonly payeeBillingAddress?: BillingAddress | null;
  readonly parameters?: Record<string, any> | null;
  readonly customData?: Record<string, any> | null;

  constructor(args: {
    operation: OpenPaymentPlatformOperation;
    successUrl: string;
    order: OpenPaymentPlatformOrder;

    methods?: string[] | null;
    channelId?: string | null;
    sessionExpiry?: number | null;
    cancelUrl?: string | null;
    expiryUrl?: string | null;
    errorUrl?: string | null;
    urlTarget?: string | null;
    reqToken?: boolean | null;
    cardToken?: string[] | null;
    formId?: string | null;
    recurringInit?: boolean | null;
    scheduleId?: string | null;
    vatCalc?: boolean | null;

    customer?: Customer | null;
    billingAddress?: BillingAddress | null;
    payee?: Payee | null;
    payeeBillingAddress?: BillingAddress | null;

    parameters?: Record<string, any> | null;
    customData?: Record<string, any> | null;
  }) {
    this.operation = args.operation;
    this.successUrl = args.successUrl;
    this.order = args.order;

    this.methods = args.methods ?? null;
    this.channelId = args.channelId ?? null;
    this.sessionExpiry = args.sessionExpiry ?? null;
    this.cancelUrl = args.cancelUrl ?? null;
    this.expiryUrl = args.expiryUrl ?? null;
    this.errorUrl = args.errorUrl ?? null;
    this.urlTarget = args.urlTarget ?? null;
    this.reqToken = args.reqToken ?? null;
    this.cardToken = args.cardToken ?? null;
    this.formId = args.formId ?? null;
    this.recurringInit = args.recurringInit ?? null;
    this.scheduleId = args.scheduleId ?? null;
    this.vatCalc = args.vatCalc ?? null;

    this.customer = args.customer ?? null;
    this.billingAddress = args.billingAddress ?? null;
    this.payee = args.payee ?? null;
    this.payeeBillingAddress = args.payeeBillingAddress ?? null;

    this.parameters = args.parameters ?? null;
    this.customData = args.customData ?? null;
  }

  /**
   * Serializes the request into the JSON payload expected by the backend.
   *
   * Keys are snake_cased to match typical API conventions.
   * Optional fields are omitted when they are `null`.
   */
  toJson(): Record<string, any> {
    return {
      operation: this.operation,
      success_url: this.successUrl,
      ...(this.methods != null ? { methods: this.methods } : {}),
      ...(this.channelId != null ? { channel_id: this.channelId } : {}),
      ...(this.sessionExpiry != null ? { session_expiry: this.sessionExpiry } : {}),
      ...(this.cancelUrl != null ? { cancel_url: this.cancelUrl } : {}),
      ...(this.expiryUrl != null ? { expiry_url: this.expiryUrl } : {}),
      ...(this.errorUrl != null ? { error_url: this.errorUrl } : {}),
      ...(this.urlTarget != null ? { url_target: this.urlTarget } : {}),
      ...(this.reqToken != null ? { req_token: this.reqToken } : {}),
      ...(this.cardToken != null ? { card_token: this.cardToken } : {}),
      ...(this.formId != null ? { form_id: this.formId } : {}),
      ...(this.recurringInit != null ? { recurring_init: this.recurringInit } : {}),
      ...(this.scheduleId != null ? { schedule_id: this.scheduleId } : {}),
      ...(this.vatCalc != null ? { vat_calc: this.vatCalc } : {}),
      order: this.order.toJson(),
      ...(this.customer != null ? { customer: this.customer.toJson() } : {}),
      ...(this.billingAddress != null ? { billing_address: this.billingAddress.toJson() } : {}),
      ...(this.payee != null ? { payee: this.payee.toJson() } : {}),
      ...(this.payeeBillingAddress != null
        ? { payee_billing_address: this.payeeBillingAddress.toJson() }
        : {}),
      ...(this.parameters != null ? { parameters: this.parameters } : {}),
      ...(this.customData != null ? { custom_data: this.customData } : {}),
    };
  }
}
