import type { OpenPaymentPlatformRequest } from './models/checkout/openpaymentplatform_request';
import { CheckStatusResult } from './models/check_status_model';
import { OpenPaymentPlatformVoid } from './models/openpaymentplatform_void';
/**
 * Main entry point for working with OpenPaymentPlatform backend APIs.
 *
 * This class is implemented as a singleton (`OpenPaymentPlatform.instance`) so that the
 * checkout UI component and HTTP layer can share the same configuration
 * (backend URL, merchant key, password).
 *
 * Typical usage:
 * 1) Call {@link OpenPaymentPlatform.initialize} once on app startup.
 * 2) Create an {@link OpenPaymentPlatformRequest} and pass it into {@link CheckoutController}.
 * 3) Render {@link OpenPaymentPlatformCheckout} to start the checkout flow.
 *
 * @example
 * ```ts
 * import { OpenPaymentPlatform } from 'react_native_openpaymentplatform';
 *
 * OpenPaymentPlatform.instance.initialize({
 *   backendUrl: 'https://your-backend.example',
 *   merchantKey: 'YOUR_MERCHANT_KEY',
 *   password: 'YOUR_PASSWORD',
 * });
 * ```
 */
export declare class OpenPaymentPlatform {
    private static readonly _instance;
    /**
     * Global singleton instance.
     *
     * Note: this is mutable state. Make sure you call {@link initialize} before
     * calling any API methods.
     */
    static get instance(): OpenPaymentPlatform;
    private constructor();
    /** Base URL of your backend that proxies/implements OpenPaymentPlatform API endpoints. */
    backendUrl: string;
    /** Merchant key provided by OpenPaymentPlatform. Sent to the backend with each request. */
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
     * OpenPaymentPlatform.instance.initialize({
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
    fetchPaymentUrl(request: OpenPaymentPlatformRequest): Promise<string>;
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
    }): Promise<OpenPaymentPlatformVoid>;
}
//# sourceMappingURL=openpaymentplatform.d.ts.map