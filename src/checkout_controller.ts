import type { PaymentException } from './exceptions/exceptions';
import type { OpenPaymentPlatformRequest } from './models/checkout/openpaymentplatform_request';

/**
 * Called when WebView navigates to any URL.
 *
 * The library will try to classify redirects into success/error/cancel based on
 * the URLs provided in {@link OpenPaymentPlatformRequest}. If the URL does not match any
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
 * You pass an instance of this controller into {@link OpenPaymentPlatformCheckout}. The
 * component uses it to:
 * - request the payment URL from the backend
 * - detect redirect URLs (success/error/cancel)
 * - deliver redirect and error callbacks
 *
 * @example
 * ```ts
 * import {
 *   CheckoutController,
 *   OpenPaymentPlatformRequest,
 *   OpenPaymentPlatformOperation,
 *   OpenPaymentPlatformOrder,
 * } from 'react_native_openpaymentplatform';
 *
 * const request = new OpenPaymentPlatformRequest({
 *   operation: OpenPaymentPlatformOperation.purchase,
 *   successUrl: 'myapp://payment/success',
 *   cancelUrl: 'myapp://payment/cancel',
 *   errorUrl: 'myapp://payment/error',
 *   order: new OpenPaymentPlatformOrder({
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
  readonly paymentRequest: OpenPaymentPlatformRequest;

  private _onSuccessRedirect?: OnRedirectCallback;
  private _onErrorRedirect?: OnRedirectCallback;
  private _onCancelRedirect?: OnRedirectCallback;
  private _onRedirectCallback?: OnRedirectCallback;
  private _onError?: OnPaymentErrorCallback;

  constructor(args: {
    paymentRequest: OpenPaymentPlatformRequest;
    onSuccessRedirect?: OnRedirectCallback;
    onErrorRedirect?: OnRedirectCallback;
    onCancelRedirect?: OnRedirectCallback;
    onRedirectCallback?: OnRedirectCallback;
    onError?: OnPaymentErrorCallback;
  }) {
    this.paymentRequest = args.paymentRequest;
    this._onSuccessRedirect = args.onSuccessRedirect;
    this._onErrorRedirect = args.onErrorRedirect;
    this._onCancelRedirect = args.onCancelRedirect;
    this._onRedirectCallback = args.onRedirectCallback;
    this._onError = args.onError;
  }

  get onSuccessRedirect(): OnRedirectCallback | undefined {
    return this._onSuccessRedirect;
  }
  get onErrorRedirect(): OnRedirectCallback | undefined {
    return this._onErrorRedirect;
  }
  get onCancelRedirect(): OnRedirectCallback | undefined {
    return this._onCancelRedirect;
  }

  /**
   * Called for redirects that are not classified as success/error/cancel.
   * Useful for analytics and debugging.
   */
  get onRedirectCallback(): OnRedirectCallback | undefined {
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
  get onError(): OnPaymentErrorCallback | undefined {
    return this._onError;
  }
}
