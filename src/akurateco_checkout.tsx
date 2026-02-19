import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { Akurateco } from './akurateco';
import type { CheckoutController } from './checkout_controller';
import {
  PaymentCallbackException,
  PaymentException,
  PaymentInitializationException,
  PaymentWebViewException,
} from './exceptions/exceptions';

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
export function AkuratecoCheckout({ controller }: Props) {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const mounted = useRef(true);

  const matchers = useMemo(() => {
    const r = controller.paymentRequest;
    return {
      success: r.successUrl,
      error: r.errorUrl ?? null,
      cancel: r.cancelUrl ?? null,
    };
  }, [controller.paymentRequest]);

  /**
   * Routes a navigation URL to the appropriate callback.
   *
   * Matching is done with a simple `includes(...)` check against the URLs
   * configured in the payment request.
   */
  const handleUrl = (url: string) => {
    console.log(`[AkuratecoCheckout] Navigating to URL: ${url}`);
    try {
      if (url.includes(matchers.success)) {
        controller.onSuccessRedirect?.(url);
      } else if (matchers.error && url.includes(matchers.error)) {
      console.log(`[AkuratecoCheckout] Detected error redirect URL.`);
        controller.onErrorRedirect?.(url);
      } else if (matchers.cancel && url.includes(matchers.cancel)) {
        controller.onCancelRedirect?.(url);
      } else {
        controller.onRedirectCallback?.(url);
      }
    } catch (e: any) {
      controller.onError?.(new PaymentCallbackException(`Callback error: ${String(e)}`));
    }
  };

  /**
   * Normalizes WebView error payload and forwards it as a PaymentWebViewException.
   */
  const handleWebError = (e: any) => {
    const description =
      e?.nativeEvent?.description ??
      e?.nativeEvent?.didFailProvisionalNavigation?.toString?.() ??
      'WebView error';
    controller.onError?.(new PaymentWebViewException(description));
  };

  useEffect(() => {
    mounted.current = true;

    (async () => {
      try {
        console.log('[AkuratecoCheckout] Requesting payment URL with request:');
        const url = await Akurateco.instance.fetchPaymentUrl(controller.paymentRequest);
        if (mounted.current) setPaymentUrl(url);
      } catch (e: any) {

  if (e instanceof PaymentException) {
    controller.onError?.(e);
  } else {
    controller.onError?.(
      new PaymentInitializationException(
        `Unexpected error: ${e.message ?? String(e)}`
      )
    );
  }
}
    })();

    return () => {
      mounted.current = false;
    };
  }, [controller]);

  if (!paymentUrl) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: paymentUrl }}
      onShouldStartLoadWithRequest={(req: any) => {
        console.log(`[AkuratecoCheckout] onShouldStartLoadWithRequest: ${req?.url}`);
        const url = req?.url;
        if (typeof url === 'string') handleUrl(url);
        return true;
      }}
      onError={handleWebError}
      javaScriptEnabled
    />
  );
}
