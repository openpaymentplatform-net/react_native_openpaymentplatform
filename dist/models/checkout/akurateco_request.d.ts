import { AkuratecoOrder } from '../akurateco_order';
import { Customer } from '../customer';
import { BillingAddress } from './billing_address';
import { Payee } from './payee';
/**
 * Operation type for the hosted checkout.
 */
export declare enum AkuratecoOperation {
    purchase = "purchase",
    debit = "debit",
    transfer = "transfer"
}
/**
 * Checkout session creation request.
 *
 * This object is serialized with {@link toJson} and sent to your backend. The
 * backend typically adds merchant data (merchant key) and a signature/hash.
 */
export declare class AkuratecoRequest {
    readonly operation: AkuratecoOperation;
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
    readonly order: AkuratecoOrder;
    readonly customer?: Customer | null;
    readonly billingAddress?: BillingAddress | null;
    readonly payee?: Payee | null;
    readonly payeeBillingAddress?: BillingAddress | null;
    readonly parameters?: Record<string, any> | null;
    readonly customData?: Record<string, any> | null;
    constructor(args: {
        operation: AkuratecoOperation;
        successUrl: string;
        order: AkuratecoOrder;
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
    });
    /**
     * Serializes the request into the JSON payload expected by the backend.
     *
     * Keys are snake_cased to match typical API conventions.
     * Optional fields are omitted when they are `null`.
     */
    toJson(): Record<string, any>;
}
//# sourceMappingURL=akurateco_request.d.ts.map