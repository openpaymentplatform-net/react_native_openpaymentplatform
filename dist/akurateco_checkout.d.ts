import type { CheckoutController } from './checkout_controller';
type Props = {
    /**
     * Controller that contains the payment request and user callbacks.
     *
     * The component uses it to request the checkout URL and to route all redirect
     * events to the appropriate callback.
     */
    controller: CheckoutController;
};
/**
 * React Native component that performs the hosted Akurateco checkout inside a WebView.
 *
 * Flow:
 * 1) On mount, it calls `Akurateco.instance.fetchPaymentUrl(...)`.
 * 2) When the payment URL is received, it loads it into a `react-native-webview`.
 * 3) Every navigation is inspected. If it matches success/error/cancel URLs, the
 *    matching callback on the provided controller is called.
 *
 * Errors:
 * - Backend/network errors are reported via `controller.onError`.
 * - WebView navigation/load errors are reported via `controller.onError`.
 * - Exceptions thrown from user callbacks are caught and wrapped into
 *   {@link PaymentCallbackException}.
 *
 * @example
 * ```tsx
 * import React, { useMemo } from 'react';
 * import { AkuratecoCheckout, CheckoutController } from 'react_native_akurateco';
 *
 * export function CheckoutScreen() {
 *   const controller = useMemo(() => {
 *     // Create the controller once (typically with a request created elsewhere)
 *     return new CheckoutController({
 *       paymentRequest: request,
 *       onSuccessRedirect: () => navigation.replace('Success'),
 *       onCancelRedirect: () => navigation.goBack(),
 *       onError: (e) => console.error(e),
 *     });
 *   }, []);
 *
 *   return <AkuratecoCheckout controller={controller} />;
 * }
 * ```
 */
export declare function AkuratecoCheckout({ controller }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=akurateco_checkout.d.ts.map