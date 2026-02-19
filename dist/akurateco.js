import { HttpServiceService } from './http/http_service';
/**
 * Main entry point for working with Akurateco backend APIs.
 *
 * This class is implemented as a singleton (`Akurateco.instance`) so that the
 * checkout UI component and HTTP layer can share the same configuration
 * (backend URL, merchant key, password).
 *
 * Typical usage:
 * 1) Call {@link Akurateco.initialize} once on app startup.
 * 2) Create an {@link AkuratecoRequest} and pass it into {@link CheckoutController}.
 * 3) Render {@link AkuratecoCheckout} to start the checkout flow.
 *
 * @example
 * ```ts
 * import { Akurateco } from 'react_native_akurateco';
 *
 * Akurateco.instance.initialize({
 *   backendUrl: 'https://your-backend.example',
 *   merchantKey: 'YOUR_MERCHANT_KEY',
 *   password: 'YOUR_PASSWORD',
 * });
 * ```
 */
export class Akurateco {
    /**
     * Global singleton instance.
     *
     * Note: this is mutable state. Make sure you call {@link initialize} before
     * calling any API methods.
     */
    static get instance() {
        return Akurateco._instance;
    }
    constructor() { }
    /**
     * Initializes the singleton with credentials and backend address.
     *
     * Must be called once before using:
     * - {@link fetchPaymentUrl}
     * - {@link checkStatus}
     * - {@link refundPayment}
     * - {@link voidPayment}
     *
     * @example
     * ```ts
     * Akurateco.instance.initialize({
     *   backendUrl: 'https://your-backend.example',
     *   merchantKey: 'YOUR_MERCHANT_KEY',
     *   password: 'YOUR_PASSWORD',
     * });
     * ```
     */
    initialize(args) {
        this.backendUrl = args.backendUrl;
        this.merchantKey = args.merchantKey;
        this.password = args.password;
        this._httpService = new HttpServiceService(args.backendUrl, args.merchantKey);
    }
    /**
     * Creates a payment session on the backend and returns the checkout redirect URL.
     *
     * @throws PaymentBackendException If the backend returned non-200 or unexpected payload.
     * @throws PaymentInitializationException For unexpected/network errors.
     */
    fetchPaymentUrl(request) {
        return this._httpService.fetchPaymentUrl(request);
    }
    /**
     * Requests payment status from the backend.
     *
     * Provide either `paymentId` or `orderId` (one is enough).
     *
     * @throws PaymentBackendException If the backend returned non-200.
     * @throws PaymentInitializationException For unexpected/network errors.
     */
    checkStatus(args) {
        return this._httpService.checkStatus(args);
    }
    /**
     * Requests a refund for a payment.
     *
     * @param args.paymentId Payment identifier.
     * @param args.amount Refund amount as a string (format depends on your backend requirements).
     */
    refundPayment(args) {
        return this._httpService.refund(args);
    }
    /**
     * Requests a void operation for a payment.
     *
     * @param args.paymentId Payment identifier.
     */
    voidPayment(args) {
        return this._httpService.voidOperation(args);
    }
}
Akurateco._instance = new Akurateco();
//# sourceMappingURL=akurateco.js.map