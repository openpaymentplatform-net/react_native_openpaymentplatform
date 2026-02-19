/**
 * Base class for all library-specific exceptions.
 *
 * The checkout component and HTTP layer always try to surface errors as
 * `PaymentException` (or one of its subclasses) so consumers can reliably
 * handle them in a single `catch` / callback.
 */
export declare abstract class PaymentException extends Error {
    readonly message: string;
    constructor(message: string);
    toString(): string;
}
export declare class PaymentInitializationException extends PaymentException {
    /**
     * Thrown when an unexpected error occurs (network failures, JSON parse errors,
     * missing initialization, etc.).
     */
    constructor(message: string);
}
export declare class PaymentBackendException extends PaymentException {
    readonly response?: {
        status?: number;
        body?: string;
    } | undefined;
    /**
     * Thrown when the backend returns a non-success response or an invalid payload.
     *
     * The optional `response` field can contain the HTTP status code and raw body.
     */
    constructor(message: string, response?: {
        status?: number;
        body?: string;
    } | undefined);
    toString(): string;
}
export declare class PaymentWebViewException extends PaymentException {
    /**
     * Thrown when the WebView reports a loading/navigation error.
     */
    constructor(message: string);
}
export declare class PaymentCallbackException extends PaymentException {
    /**
     * Thrown when a user-provided callback throws.
     *
     * This prevents unhandled errors from crashing the checkout component.
     */
    constructor(message: string);
}
//# sourceMappingURL=exceptions.d.ts.map