import { OpenPaymentPlatformOrder } from './openpaymentplatform_order';
import { Customer } from './customer';
import { PaymentStatus } from './enums';
/**
 * Parsed response from the backend payment status endpoint.
 */
export declare class CheckStatusResult {
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
    });
    /**
     * Creates an instance from a backend JSON payload.
     */
    static fromJson(json: any): CheckStatusResult;
    /**
     * Serializes the model back to backend JSON format.
     */
    toJson(): Record<string, any>;
}
//# sourceMappingURL=check_status_model.d.ts.map