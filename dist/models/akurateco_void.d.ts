import { AkuratecoOrder } from './akurateco_order';
import { PaymentStatus } from './enums';
/**
 * Parsed response from the backend void endpoint.
 */
export declare class AkuratecoVoid {
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
    });
    /**
     * Creates an instance from a backend JSON payload.
     */
    static fromJson(json: any): AkuratecoVoid;
    /**
     * Serializes the model back to backend JSON format.
     */
    toJson(): Record<string, any>;
}
//# sourceMappingURL=akurateco_void.d.ts.map