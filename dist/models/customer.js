/**
 * Customer details optionally attached to a checkout request.
 */
export class Customer {
    constructor(args) {
        var _a;
        this.name = args.name;
        this.email = args.email;
        this.digitalWallet = (_a = args.digitalWallet) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Creates an instance from a backend JSON payload.
     */
    static fromJson(json) {
        return new Customer({
            name: json === null || json === void 0 ? void 0 : json['name'],
            email: json === null || json === void 0 ? void 0 : json['email'],
            digitalWallet: json === null || json === void 0 ? void 0 : json['digital_wallet'],
        });
    }
    /**
     * Serializes the customer to JSON expected by the backend.
     */
    toJson() {
        return {
            name: this.name,
            email: this.email,
            ...(this.digitalWallet != null ? { digital_wallet: this.digitalWallet } : {}),
        };
    }
}
//# sourceMappingURL=customer.js.map