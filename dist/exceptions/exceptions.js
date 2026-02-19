/**
 * Base class for all library-specific exceptions.
 *
 * The checkout component and HTTP layer always try to surface errors as
 * `PaymentException` (or one of its subclasses) so consumers can reliably
 * handle them in a single `catch` / callback.
 */
export class PaymentException extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'PaymentException';
    }
    toString() {
        return `${this.name}: ${this.message}`;
    }
}
export class PaymentInitializationException extends PaymentException {
    /**
     * Thrown when an unexpected error occurs (network failures, JSON parse errors,
     * missing initialization, etc.).
     */
    constructor(message) {
        super(message);
        this.name = 'PaymentInitializationException';
    }
}
export class PaymentBackendException extends PaymentException {
    /**
     * Thrown when the backend returns a non-success response or an invalid payload.
     *
     * The optional `response` field can contain the HTTP status code and raw body.
     */
    constructor(message, response) {
        super(message);
        this.response = response;
        this.name = 'PaymentBackendException';
    }
    toString() {
        var _a, _b, _c;
        const status = (_a = this.response) === null || _a === void 0 ? void 0 : _a.status;
        const body = (_c = (_b = this.response) === null || _b === void 0 ? void 0 : _b.body) !== null && _c !== void 0 ? _c : '';
        return `${this.name}: ${this.message}. Status code: ${status}. Response: ${body}`;
    }
}
export class PaymentWebViewException extends PaymentException {
    /**
     * Thrown when the WebView reports a loading/navigation error.
     */
    constructor(message) {
        super(message);
        this.name = 'PaymentWebViewException';
    }
}
export class PaymentCallbackException extends PaymentException {
    /**
     * Thrown when a user-provided callback throws.
     *
     * This prevents unhandled errors from crashing the checkout component.
     */
    constructor(message) {
        super(message);
        this.name = 'PaymentCallbackException';
    }
}
//# sourceMappingURL=exceptions.js.map