/**
 * Billing address details attached to a checkout request.
 */
export declare class BillingAddress {
    readonly country: string;
    readonly state: string;
    readonly city: string;
    readonly district: string;
    readonly address: string;
    readonly houseNumber: string;
    readonly zip: string;
    readonly phone: string;
    constructor(args: {
        country: string;
        state: string;
        city: string;
        district: string;
        address: string;
        houseNumber: string;
        zip: string;
        phone: string;
    });
    /**
     * Creates an instance from a backend JSON payload.
     */
    static fromJson(json: any): BillingAddress;
    /**
     * Serializes the address to backend JSON format.
     */
    toJson(): Record<string, any>;
}
//# sourceMappingURL=billing_address.d.ts.map