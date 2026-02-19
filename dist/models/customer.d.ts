/**
 * Customer details optionally attached to a checkout request.
 */
export declare class Customer {
    readonly name: string;
    readonly email: string;
    readonly digitalWallet?: string | null;
    constructor(args: {
        name: string;
        email: string;
        digitalWallet?: string | null;
    });
    /**
     * Creates an instance from a backend JSON payload.
     */
    static fromJson(json: any): Customer;
    /**
     * Serializes the customer to JSON expected by the backend.
     */
    toJson(): Record<string, any>;
}
//# sourceMappingURL=customer.d.ts.map