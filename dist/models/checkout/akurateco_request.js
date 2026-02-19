/**
 * Operation type for the hosted checkout.
 */
export var AkuratecoOperation;
(function (AkuratecoOperation) {
    AkuratecoOperation["purchase"] = "purchase";
    AkuratecoOperation["debit"] = "debit";
    AkuratecoOperation["transfer"] = "transfer";
})(AkuratecoOperation || (AkuratecoOperation = {}));
/**
 * Checkout session creation request.
 *
 * This object is serialized with {@link toJson} and sent to your backend. The
 * backend typically adds merchant data (merchant key) and a signature/hash.
 */
export class AkuratecoRequest {
    constructor(args) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        this.operation = args.operation;
        this.successUrl = args.successUrl;
        this.order = args.order;
        this.methods = (_a = args.methods) !== null && _a !== void 0 ? _a : null;
        this.channelId = (_b = args.channelId) !== null && _b !== void 0 ? _b : null;
        this.sessionExpiry = (_c = args.sessionExpiry) !== null && _c !== void 0 ? _c : null;
        this.cancelUrl = (_d = args.cancelUrl) !== null && _d !== void 0 ? _d : null;
        this.expiryUrl = (_e = args.expiryUrl) !== null && _e !== void 0 ? _e : null;
        this.errorUrl = (_f = args.errorUrl) !== null && _f !== void 0 ? _f : null;
        this.urlTarget = (_g = args.urlTarget) !== null && _g !== void 0 ? _g : null;
        this.reqToken = (_h = args.reqToken) !== null && _h !== void 0 ? _h : null;
        this.cardToken = (_j = args.cardToken) !== null && _j !== void 0 ? _j : null;
        this.formId = (_k = args.formId) !== null && _k !== void 0 ? _k : null;
        this.recurringInit = (_l = args.recurringInit) !== null && _l !== void 0 ? _l : null;
        this.scheduleId = (_m = args.scheduleId) !== null && _m !== void 0 ? _m : null;
        this.vatCalc = (_o = args.vatCalc) !== null && _o !== void 0 ? _o : null;
        this.customer = (_p = args.customer) !== null && _p !== void 0 ? _p : null;
        this.billingAddress = (_q = args.billingAddress) !== null && _q !== void 0 ? _q : null;
        this.payee = (_r = args.payee) !== null && _r !== void 0 ? _r : null;
        this.payeeBillingAddress = (_s = args.payeeBillingAddress) !== null && _s !== void 0 ? _s : null;
        this.parameters = (_t = args.parameters) !== null && _t !== void 0 ? _t : null;
        this.customData = (_u = args.customData) !== null && _u !== void 0 ? _u : null;
    }
    /**
     * Serializes the request into the JSON payload expected by the backend.
     *
     * Keys are snake_cased to match typical API conventions.
     * Optional fields are omitted when they are `null`.
     */
    toJson() {
        return {
            operation: this.operation,
            success_url: this.successUrl,
            ...(this.methods != null ? { methods: this.methods } : {}),
            ...(this.channelId != null ? { channel_id: this.channelId } : {}),
            ...(this.sessionExpiry != null ? { session_expiry: this.sessionExpiry } : {}),
            ...(this.cancelUrl != null ? { cancel_url: this.cancelUrl } : {}),
            ...(this.expiryUrl != null ? { expiry_url: this.expiryUrl } : {}),
            ...(this.errorUrl != null ? { error_url: this.errorUrl } : {}),
            ...(this.urlTarget != null ? { url_target: this.urlTarget } : {}),
            ...(this.reqToken != null ? { req_token: this.reqToken } : {}),
            ...(this.cardToken != null ? { card_token: this.cardToken } : {}),
            ...(this.formId != null ? { form_id: this.formId } : {}),
            ...(this.recurringInit != null ? { recurring_init: this.recurringInit } : {}),
            ...(this.scheduleId != null ? { schedule_id: this.scheduleId } : {}),
            ...(this.vatCalc != null ? { vat_calc: this.vatCalc } : {}),
            order: this.order.toJson(),
            ...(this.customer != null ? { customer: this.customer.toJson() } : {}),
            ...(this.billingAddress != null ? { billing_address: this.billingAddress.toJson() } : {}),
            ...(this.payee != null ? { payee: this.payee.toJson() } : {}),
            ...(this.payeeBillingAddress != null
                ? { payee_billing_address: this.payeeBillingAddress.toJson() }
                : {}),
            ...(this.parameters != null ? { parameters: this.parameters } : {}),
            ...(this.customData != null ? { custom_data: this.customData } : {}),
        };
    }
}
//# sourceMappingURL=akurateco_request.js.map