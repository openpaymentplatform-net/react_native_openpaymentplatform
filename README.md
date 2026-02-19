# react_native_akurateco

React Native SDK for integrating with Akurateco via **your own backend**.

This SDK focuses on two practical things:
1) provides typed models to build a checkout/session request,
2) renders the hosted checkout in `react-native-webview` and delivers redirect callbacks (success/cancel/error).

Important: the library **does not call Akurateco directly**. It sends requests to your API (`backendUrl`), and your backend performs the Akurateco integration/proxying.

## Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Checkout UI (WebView)](#checkout-ui-webview)
- [API: Akurateco](#api-akurateco)
- [Backend API (what you must implement)](#backend-api-what-you-must-implement)
- [Errors](#errors)
- [Security notes](#security-notes)
- [Troubleshooting](#troubleshooting)

## Requirements

- A React Native app (iOS/Android).
- `react-native-webview` (peer dependency, because checkout is shown in a WebView).
- A working backend that exposes endpoints for: session creation, status check, refund, and void.

Compatibility note: the `example/` app is built for Expo SDK 54 / React Native 0.81, but the SDK can also be used in “bare” React Native projects.

## Installation

```sh
npm i @akurateco/react-native-akurateco
```

### Dependencies your app must install

In the app that consumes the SDK, install peer dependencies:

```sh
npm i react-native-webview
```

If you use Expo, prefer:

```sh
expo install react-native-webview
```

On iOS (bare projects), you’ll typically need to install pods:

```sh
cd ios && pod install
```

Note: `crypto-js` is installed automatically as a dependency of this SDK.

## Quick start

### 1) Initialize

Initialize the singleton once at app startup using `Akurateco.instance`:

```ts
import { Akurateco } from '@akurateco/react-native-akurateco';

Akurateco.instance.initialize({
  backendUrl: 'https://your-backend.example',
  merchantKey: 'YOUR_MERCHANT_KEY',
  password: 'YOUR_PASSWORD',
});
```

### 2) Build a payment request

```ts
import {
  AkuratecoRequest,
  AkuratecoOperation,
  AkuratecoOrder,
} from '@akurateco/react-native-akurateco';

const request = new AkuratecoRequest({
  operation: AkuratecoOperation.purchase,
  successUrl: 'https://your-app.example/payment/success',
  cancelUrl: 'https://your-app.example/payment/cancel',
  errorUrl: 'https://your-app.example/payment/error',
  order: new AkuratecoOrder({
    number: 'ORDER-123',
    amount: '10.00',
    currency: 'USD',
    description: 'Order #123',
  }),
});
```

> The redirect URLs can be HTTPS routes or app/deep-link routes — the SDK only needs them to recognize success/cancel/error redirects.

### 3) Open checkout

```tsx
import React, { useMemo } from 'react';
import { AkuratecoCheckout, CheckoutController } from '@akurateco/react-native-akurateco';

export function CheckoutScreen() {
  const controller = useMemo(
    () =>
      new CheckoutController({
        paymentRequest: request,
        onSuccessRedirect: (url) => {
          console.log('Success redirect:', url);
        },
        onCancelRedirect: (url) => {
          console.log('Cancel redirect:', url);
        },
        onErrorRedirect: (url) => {
          console.log('Error redirect:', url);
        },
        onError: (e) => {
          console.error('Checkout error:', e);
        },
      }),
    [],
  );

  return <AkuratecoCheckout controller={controller} />;
}
```

## Checkout UI (WebView)

`AkuratecoCheckout` does the following:
1) on mount, calls `Akurateco.instance.fetchPaymentUrl(paymentRequest)`,
2) opens the returned URL in `react-native-webview`,
3) listens to navigation and calls the callbacks from `CheckoutController`.

### How redirects are detected

The SDK reads `successUrl`, `errorUrl`, `cancelUrl` from `AkuratecoRequest` and checks every navigation with a simple `url.includes(...)`.

Tip: keep these URLs reasonably unique (e.g. `/payment/success`) to avoid accidental matches.

## API: Akurateco

`Akurateco` is a facade for backend requests. It stores configuration and uses it for all API calls.

### initialize

```ts
Akurateco.instance.initialize({ backendUrl, merchantKey, password });
```

This must be called before any methods below.

### fetchPaymentUrl

```ts
const url = await Akurateco.instance.fetchPaymentUrl(request);
```

Creates a session on your backend and returns `redirect_url` which is then loaded in the WebView.

### checkStatus

```ts
const status = await Akurateco.instance.checkStatus({ paymentId: '123' });
// or
const status2 = await Akurateco.instance.checkStatus({ orderId: 'ORDER-123' });
```

### refundPayment

```ts
const result = await Akurateco.instance.refundPayment({ paymentId: '123', amount: '10.00' });
```

### voidPayment

```ts
const result = await Akurateco.instance.voidPayment({ paymentId: '123' });
```

## Backend API (what you must implement)

The SDK expects your `backendUrl` to accept `POST` requests at:

- `POST /api/v1/session` → must return JSON with `redirect_url`
- `POST /api/v1/payment/status`
- `POST /api/v1/payment/refund`
- `POST /api/v1/payment/void`

Payload is created from the SDK models using `snake_case`. The SDK also sends:
- `merchant_key`
- `hash` (signature)

Minimal response example for `/api/v1/session`:

```json
{ "redirect_url": "https://hosted-checkout.example/..." }
```

## Errors

All errors delivered to `controller.onError` extend `PaymentException`.
Common types:

- `PaymentBackendException` — backend returned a non-`200` response or an unexpected payload.
- `PaymentInitializationException` — network/parse/other unexpected errors.
- `PaymentWebViewException` — WebView load/navigation error.
- `PaymentCallbackException` — one of your callbacks threw (SDK catches it so the UI flow doesn’t crash).

## Security notes

- The SDK uses `password` to generate request signatures (`hash`). That means the secret exists in the mobile app.
- If that’s not acceptable for your architecture, move signing to your backend and avoid shipping the secret to the client.
- In any case: do not log `password` and avoid storing it in plain text.

## Troubleshooting

- iOS (bare): after installing `react-native-webview`, run `cd ios && pod install`.
- Blank WebView screen: verify that `/api/v1/session` returns a valid `redirect_url`.
- Callbacks don’t fire: ensure `successUrl/errorUrl/cancelUrl` are unique enough (matching uses `includes`).
- Initialization errors: make sure `Akurateco.instance.initialize(...)` runs before rendering `AkuratecoCheckout`.

## Getting help

To report a specific issue or feature request, open a new issue.

Or write a direct letter to admin@akurateco.com.

## License

MIT License. See the LICENSE file for more details.

## Contacts

![](https://github.com/akurateco/akurateco-android-sdk/blob/main/media/footer.jpg)

Website: https://akurateco.com

Phone: +31-638-7642-70

Email: admin@akurateco.com

Address: Akurateco BV, Kingsfordweg 151, 1043 GR Amsterdam, The Netherlands

---

© 2014 - 2020 Akurateco. All rights reserved.
