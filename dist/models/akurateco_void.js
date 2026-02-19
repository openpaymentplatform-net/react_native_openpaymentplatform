import { AkuratecoOrder } from './akurateco_order';
import { statusToString, stringToStatus } from './enums';
/**
 * Parsed response from the backend void endpoint.
 */
export class AkuratecoVoid {
    constructor(args) {
        var _a;
        this.status = args.status;
        this.paymentId = args.paymentId;
        this.date = args.date;
        this.reason = (_a = args.reason) !== null && _a !== void 0 ? _a : null;
        this.order = args.order;
    }
    /**
     * Creates an instance from a backend JSON payload.
     */
    static fromJson(json) {
        return new AkuratecoVoid({
            status: stringToStatus(json === null || json === void 0 ? void 0 : json['status']),
            paymentId: json === null || json === void 0 ? void 0 : json['payment_id'],
            date: new Date(Date.parse(json === null || json === void 0 ? void 0 : json['date'])),
            reason: json === null || json === void 0 ? void 0 : json['reason'],
            order: AkuratecoOrder.fromJson(json === null || json === void 0 ? void 0 : json['order']),
        });
    }
    /**
     * Serializes the model back to backend JSON format.
     */
    toJson() {
        var _a;
        return {
            status: statusToString(this.status),
            payment_id: this.paymentId,
            date: this.date.toISOString(),
            reason: (_a = this.reason) !== null && _a !== void 0 ? _a : null,
            order: this.order.toJson(),
        };
    }
}
//# sourceMappingURL=akurateco_void.js.map