import { OpenPaymentPlatformOrder } from './openpaymentplatform_order';
import { Customer } from './customer';
import { statusToString, stringToStatus } from './enums';
/**
 * Parsed response from the backend payment status endpoint.
 */
export class CheckStatusResult {
    constructor(args) {
        var _a, _b, _c, _d;
        this.paymentId = args.paymentId;
        this.date = args.date;
        this.status = args.status;
        this.reason = (_a = args.reason) !== null && _a !== void 0 ? _a : null;
        this.recurringToken = (_b = args.recurringToken) !== null && _b !== void 0 ? _b : null;
        this.sheduleId = (_c = args.sheduleId) !== null && _c !== void 0 ? _c : null;
        this.order = args.order;
        this.customer = (_d = args.customer) !== null && _d !== void 0 ? _d : null;
    }
    /**
     * Creates an instance from a backend JSON payload.
     */
    static fromJson(json) {
        return new CheckStatusResult({
            paymentId: json === null || json === void 0 ? void 0 : json['payment_id'],
            date: new Date(Date.parse(json === null || json === void 0 ? void 0 : json['date'])),
            status: stringToStatus(json === null || json === void 0 ? void 0 : json['status']),
            reason: json === null || json === void 0 ? void 0 : json['reason'],
            recurringToken: json === null || json === void 0 ? void 0 : json['recurring_token'],
            sheduleId: json === null || json === void 0 ? void 0 : json['schedule_id'],
            order: OpenPaymentPlatformOrder.fromJson(json === null || json === void 0 ? void 0 : json['order']),
            customer: (json === null || json === void 0 ? void 0 : json['customer']) != null ? Customer.fromJson(json === null || json === void 0 ? void 0 : json['customer']) : null,
        });
    }
    /**
     * Serializes the model back to backend JSON format.
     */
    toJson() {
        var _a, _b, _c;
        return {
            payment_id: this.paymentId,
            date: this.date.toISOString(),
            status: statusToString(this.status),
            reason: (_a = this.reason) !== null && _a !== void 0 ? _a : null,
            recurring_token: (_b = this.recurringToken) !== null && _b !== void 0 ? _b : null,
            schedule_id: (_c = this.sheduleId) !== null && _c !== void 0 ? _c : null,
            order: this.order.toJson(),
            ...(this.customer != null ? { customer: this.customer.toJson() } : {}),
        };
    }
}
//# sourceMappingURL=check_status_model.js.map