import { OpenPaymentPlatformOrder } from './openpaymentplatform_order';
import { PaymentStatus } from './enums';
/**
 * Parsed response from the backend void endpoint.
 */
export declare class OpenPaymentPlatformVoid {
    readonly status: PaymentStatus;
    readonly paymentId: string;
    readonly date: Date;
    readonly reason?: string | null;
    readonly order: OpenPaymentPlatformOrder;
    constructor(args: {
        status: PaymentStatus;
        paymentId: string;
        date: Date;
        reason?: string | null;
        order: OpenPaymentPlatformOrder;
    });
    /**
     * Creates an instance from a backend JSON payload.
     */
    static fromJson(json: any): OpenPaymentPlatformVoid;
    /**
     * Serializes the model back to backend JSON format.
     */
    toJson(): Record<string, any>;
}
//# sourceMappingURL=openpaymentplatform_void.d.ts.map