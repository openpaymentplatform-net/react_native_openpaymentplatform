/**
 * Recipient/payee information attached to a checkout request.
 */
export declare class Payee {
    readonly name: string;
    readonly email?: string | null;
    constructor(args: {
        name: string;
        email?: string | null;
    });
    /**
     * Creates an instance from a backend JSON payload.
     */
    static fromJson(json: any): Payee;
    /**
     * Serializes the payee to backend JSON format.
     */
    toJson(): Record<string, any>;
}
//# sourceMappingURL=payee.d.ts.map