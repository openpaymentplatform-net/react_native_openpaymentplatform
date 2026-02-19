/**
 * Recipient/payee information attached to a checkout request.
 */
export class Payee {
    constructor(args) {
        var _a;
        this.name = args.name;
        this.email = (_a = args.email) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Creates an instance from a backend JSON payload.
     */
    static fromJson(json) {
        return new Payee({
            name: json === null || json === void 0 ? void 0 : json['name'],
            email: json === null || json === void 0 ? void 0 : json['email'],
        });
    }
    /**
     * Serializes the payee to backend JSON format.
     */
    toJson() {
        var _a;
        return {
            name: this.name,
            email: (_a = this.email) !== null && _a !== void 0 ? _a : null,
        };
    }
}
//# sourceMappingURL=payee.js.map