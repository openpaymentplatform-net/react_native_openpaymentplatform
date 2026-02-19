import type { PaymentException } from './exceptions/exceptions';
import type { AkuratecoRequest } from './models/checkout/akurateco_request';
/**
 * Called when WebView navigates to any URL.
 *
 * The library will try to classify redirects into success/error/cancel based on
 * the URLs provided in {@link AkuratecoRequest}. If the URL does not match any
 * known redirect, it will be forwarded to the generic redirect callback.
 */
export type OnRedirectCallback = (url: string) => void;
/**
 * Called when checkout flow encounters an error.
 *
 * Errors are instances of {@link PaymentException} and include backend errors,
 * initialization/network errors and WebView errors.
 */
export type OnPaymentErrorCallback = (error: PaymentException) => void;
/**
 * Encapsulates a single checkout flow configuration and callbacks.
 *
 * You pass an instance of this controller into {@link AkuratecoCheckout}. The
 * component uses it to:
 * - request the payment URL from the backend
 * - detect redirect URLs (success/error/cancel)
 * - deliver redirect and error callbacks
 *
 * @example
 * ```ts
 * import {
 *   CheckoutController,
 *   AkuratecoRequest,
 *   AkuratecoOperation,
 *   AkuratecoOrder,
 * } from 'react_native_akurateco';
 *
 * const request = new AkuratecoRequest({
 *   operation: AkuratecoOperation.purchase,
 *   successUrl: 'myapp://payment/success',
 *   cancelUrl: 'myapp://payment/cancel',
 *   errorUrl: 'myapp://payment/error',
 *   order: new AkuratecoOrder({
 *     number: 'ORDER-123',
 *     amount: '10.00',
 *     currency: 'USD',
 *     description: 'Order #123',
 *   }),
 * });
 *
 * const controller = new CheckoutController({
 *   paymentRequest: request,
 *   onSuccessRedirect: (url) => console.log('Success redirect:', url),
 *   onCancelRedirect: (url) => console.log('Cancel redirect:', url),
 *   onErrorRedirect: (url) => console.log('Error redirect:', url),
 *   onError: (e) => console.error('Checkout error:', e),
 * });
 * ```
 */
export declare class CheckoutController {
    readonly paymentRequest: AkuratecoRequest;
    private _onSuccessRedirect?;
    private _onErrorRedirect?;
    private _onCancelRedirect?;
    private _onRedirectCallback?;
    private _onError?;
    constructor(args: {
        paymentRequest: AkuratecoRequest;
        onSuccessRedirect?: OnRedirectCallback;
        onErrorRedirect?: OnRedirectCallback;
        onCancelRedirect?: OnRedirectCallback;
        onRedirectCallback?: OnRedirectCallback;
        onError?: OnPaymentErrorCallback;
    });
    get onSuccessRedirect(): OnRedirectCallback | undefined;
    get onErrorRedirect(): OnRedirectCallback | undefined;
    get onCancelRedirect(): OnRedirectCallback | undefined;
    /**
     * Called for redirects that are not classified as success/error/cancel.
     * Useful for analytics and debugging.
     */
    get onRedirectCallback(): OnRedirectCallback | undefined;
    /**
     * Called when an exception happens inside the checkout flow.
     * This includes:
     * - backend errors
     * - network/initialization errors
     * - WebView errors
     * - user callback errors (wrapped into PaymentCallbackException)
     */
    get onError(): OnPaymentErrorCallback | undefined;
}
//# sourceMappingURL=checkout_controller.d.ts.map