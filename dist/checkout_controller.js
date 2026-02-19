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
export class CheckoutController {
    constructor(args) {
        this.paymentRequest = args.paymentRequest;
        this._onSuccessRedirect = args.onSuccessRedirect;
        this._onErrorRedirect = args.onErrorRedirect;
        this._onCancelRedirect = args.onCancelRedirect;
        this._onRedirectCallback = args.onRedirectCallback;
        this._onError = args.onError;
    }
    get onSuccessRedirect() {
        return this._onSuccessRedirect;
    }
    get onErrorRedirect() {
        return this._onErrorRedirect;
    }
    get onCancelRedirect() {
        return this._onCancelRedirect;
    }
    /**
     * Called for redirects that are not classified as success/error/cancel.
     * Useful for analytics and debugging.
     */
    get onRedirectCallback() {
        return this._onRedirectCallback;
    }
    /**
     * Called when an exception happens inside the checkout flow.
     * This includes:
     * - backend errors
     * - network/initialization errors
     * - WebView errors
     * - user callback errors (wrapped into PaymentCallbackException)
     */
    get onError() {
        return this._onError;
    }
}
//# sourceMappingURL=checkout_controller.js.map