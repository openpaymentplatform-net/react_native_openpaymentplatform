import type { AkuratecoRequest } from './models/checkout/akurateco_request';
import { CheckStatusResult } from './models/check_status_model';
import { AkuratecoVoid } from './models/akurateco_void';
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
export declare class Akurateco {
    private static readonly _instance;
    /**
     * Global singleton instance.
     *
     * Note: this is mutable state. Make sure you call {@link initialize} before
     * calling any API methods.
     */
    static get instance(): Akurateco;
    private constructor();
    /** Base URL of your backend that proxies/implements Akurateco API endpoints. */
    backendUrl: string;
    /** Merchant key provided by Akurateco. Sent to the backend with each request. */
    merchantKey: string;
    /** Password used for request hashing/signing. Never expose it publicly. */
    password: string;
    private _httpService;
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
    initialize(args: {
        backendUrl: string;
        merchantKey: string;
        password: string;
    }): void;
    /**
     * Creates a payment session on the backend and returns the checkout redirect URL.
     *
     * @throws PaymentBackendException If the backend returned non-200 or unexpected payload.
     * @throws PaymentInitializationException For unexpected/network errors.
     */
    fetchPaymentUrl(request: AkuratecoRequest): Promise<string>;
    /**
     * Requests payment status from the backend.
     *
     * Provide either `paymentId` or `orderId` (one is enough).
     *
     * @throws PaymentBackendException If the backend returned non-200.
     * @throws PaymentInitializationException For unexpected/network errors.
     */
    checkStatus(args: {
        paymentId?: string;
        orderId?: string;
    }): Promise<CheckStatusResult>;
    /**
     * Requests a refund for a payment.
     *
     * @param args.paymentId Payment identifier.
     * @param args.amount Refund amount as a string (format depends on your backend requirements).
     */
    refundPayment(args: {
        paymentId: string;
        amount: string;
    }): Promise<string>;
    /**
     * Requests a void operation for a payment.
     *
     * @param args.paymentId Payment identifier.
     */
    voidPayment(args: {
        paymentId: string;
    }): Promise<AkuratecoVoid>;
}
//# sourceMappingURL=akurateco.d.ts.map