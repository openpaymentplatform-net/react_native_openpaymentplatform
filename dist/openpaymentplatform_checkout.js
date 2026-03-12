import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WebView from 'react-native-webview';
import { OpenPaymentPlatform } from './openpaymentplatform';
import { PaymentCallbackException, PaymentException, PaymentInitializationException, PaymentWebViewException, } from './exceptions/exceptions';
/**
 * React Native component that performs the hosted OpenPaymentPlatform checkout inside a WebView.
 *
 * Flow:
 * 1) On mount, it calls `OpenPaymentPlatform.instance.fetchPaymentUrl(...)`.
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
 * import { OpenPaymentPlatformCheckout, CheckoutController } from 'react_native_openpaymentplatform';
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
 *   return <OpenPaymentPlatformCheckout controller={controller} />;
 * }
 * ```
 */
export function OpenPaymentPlatformCheckout({ controller }) {
    const [paymentUrl, setPaymentUrl] = useState(null);
    const mounted = useRef(true);
    const matchers = useMemo(() => {
        var _a, _b;
        const r = controller.paymentRequest;
        return {
            success: r.successUrl,
            error: (_a = r.errorUrl) !== null && _a !== void 0 ? _a : null,
            cancel: (_b = r.cancelUrl) !== null && _b !== void 0 ? _b : null,
        };
    }, [controller.paymentRequest]);
    /**
     * Routes a navigation URL to the appropriate callback.
     *
     * Matching is done with a simple `includes(...)` check against the URLs
     * configured in the payment request.
     */
    const handleUrl = (url) => {
        var _a, _b, _c, _d, _e;
        console.log(`[OpenPaymentPlatformCheckout] Navigating to URL: ${url}`);
        try {
            if (url.includes(matchers.success)) {
                (_a = controller.onSuccessRedirect) === null || _a === void 0 ? void 0 : _a.call(controller, url);
            }
            else if (matchers.error && url.includes(matchers.error)) {
                console.log(`[OpenPaymentPlatformCheckout] Detected error redirect URL.`);
                (_b = controller.onErrorRedirect) === null || _b === void 0 ? void 0 : _b.call(controller, url);
            }
            else if (matchers.cancel && url.includes(matchers.cancel)) {
                (_c = controller.onCancelRedirect) === null || _c === void 0 ? void 0 : _c.call(controller, url);
            }
            else {
                (_d = controller.onRedirectCallback) === null || _d === void 0 ? void 0 : _d.call(controller, url);
            }
        }
        catch (e) {
            (_e = controller.onError) === null || _e === void 0 ? void 0 : _e.call(controller, new PaymentCallbackException(`Callback error: ${String(e)}`));
        }
    };
    /**
     * Normalizes WebView error payload and forwards it as a PaymentWebViewException.
     */
    const handleWebError = (e) => {
        var _a, _b, _c, _d, _e, _f, _g;
        const description = (_f = (_b = (_a = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (_e = (_d = (_c = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _c === void 0 ? void 0 : _c.didFailProvisionalNavigation) === null || _d === void 0 ? void 0 : _d.toString) === null || _e === void 0 ? void 0 : _e.call(_d)) !== null && _f !== void 0 ? _f : 'WebView error';
        (_g = controller.onError) === null || _g === void 0 ? void 0 : _g.call(controller, new PaymentWebViewException(description));
    };
    useEffect(() => {
        mounted.current = true;
        (async () => {
            var _a, _b, _c;
            try {
                console.log('[OpenPaymentPlatformCheckout] Requesting payment URL with request:');
                const url = await OpenPaymentPlatform.instance.fetchPaymentUrl(controller.paymentRequest);
                if (mounted.current)
                    setPaymentUrl(url);
            }
            catch (e) {
                if (e instanceof PaymentException) {
                    (_a = controller.onError) === null || _a === void 0 ? void 0 : _a.call(controller, e);
                }
                else {
                    (_b = controller.onError) === null || _b === void 0 ? void 0 : _b.call(controller, new PaymentInitializationException(`Unexpected error: ${(_c = e.message) !== null && _c !== void 0 ? _c : String(e)}`));
                }
            }
        })();
        return () => {
            mounted.current = false;
        };
    }, [controller]);
    if (!paymentUrl) {
        return (_jsx(View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: _jsx(ActivityIndicator, {}) }));
    }
    return (_jsx(WebView, { source: { uri: paymentUrl }, onShouldStartLoadWithRequest: (req) => {
            console.log(`[OpenPaymentPlatformCheckout] onShouldStartLoadWithRequest: ${req === null || req === void 0 ? void 0 : req.url}`);
            const url = req === null || req === void 0 ? void 0 : req.url;
            if (typeof url === 'string')
                handleUrl(url);
            return true;
        }, onError: handleWebError, javaScriptEnabled: true }));
}
//# sourceMappingURL=openpaymentplatform_checkout.js.map