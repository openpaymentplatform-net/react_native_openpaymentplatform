/**
 * Order details used for creating a checkout session and for status/void payloads.
 */
export class OpenPaymentPlatformOrder {
    constructor(args) {
        this.number = args.number;
        this.amount = args.amount;
        this.currency = args.currency;
        this.description = args.description;
    }
    /**
     * Creates an instance from a backend JSON payload.
     */
    static fromJson(json) {
        return new OpenPaymentPlatformOrder({
            number: json === null || json === void 0 ? void 0 : json['number'],
            amount: json === null || json === void 0 ? void 0 : json['amount'],
            currency: json === null || json === void 0 ? void 0 : json['currency'],
            description: json === null || json === void 0 ? void 0 : json['description'],
        });
    }
    /**
     * Serializes the order to JSON expected by the backend.
     */
    toJson() {
        return {
            number: this.number,
            amount: this.amount,
            currency: this.currency,
            description: this.description,
        };
    }
    /**
     * Performs lightweight client-side validation.
     *
     * Rules:
     * - `number` must be present and <= 255 chars
     * - `amount` must parse to a number > 0 and be <= 255 chars
     * - `currency` must be uppercase A-Z of length 3..6
     * - `description` length must be 2..1024 chars
     */
    isValid() {
        const numberValid = !!this.number && this.number.length <= 255;
        const parsedAmount = Number(this.amount);
        const amountValid = this.amount != null &&
            this.amount.length <= 255 &&
            !Number.isNaN(parsedAmount) &&
            parsedAmount > 0;
        const currencyValid = /^[A-Z]{3,6}$/.test(this.currency);
        const descriptionValid = this.description != null && this.description.length >= 2 && this.description.length <= 1024;
        return numberValid && amountValid && currencyValid && descriptionValid;
    }
}
//# sourceMappingURL=openpaymentplatform_order.js.map