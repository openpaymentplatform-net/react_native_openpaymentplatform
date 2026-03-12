/**
 * Order details used for creating a checkout session and for status/void payloads.
 */
export declare class OpenPaymentPlatformOrder {
    readonly number: string;
    readonly amount: string;
    readonly currency: string;
    readonly description: string;
    constructor(args: {
        number: string;
        amount: string;
        currency: string;
        description: string;
    });
    /**
     * Creates an instance from a backend JSON payload.
     */
    static fromJson(json: any): OpenPaymentPlatformOrder;
    /**
     * Serializes the order to JSON expected by the backend.
     */
    toJson(): Record<string, any>;
    /**
     * Performs lightweight client-side validation.
     *
     * Rules:
     * - `number` must be present and <= 255 chars
     * - `amount` must parse to a number > 0 and be <= 255 chars
     * - `currency` must be uppercase A-Z of length 3..6
     * - `description` length must be 2..1024 chars
     */
    isValid(): boolean;
}
//# sourceMappingURL=openpaymentplatform_order.d.ts.map