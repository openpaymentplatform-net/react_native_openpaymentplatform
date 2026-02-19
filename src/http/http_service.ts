import { AkuratecoHashUtils } from '../utils/hash_utils';
import {
  PaymentBackendException,
  PaymentException,
  PaymentInitializationException,
} from '../exceptions/exceptions';
import { Akurateco } from '../akurateco';
import { AkuratecoVoid } from '../models/akurateco_void';
import { CheckStatusResult } from '../models/check_status_model';
import type { AkuratecoRequest } from '../models/checkout/akurateco_request';

/**
 * Internal HTTP client used by {@link Akurateco}.
 *
 * This client uses `fetch` to call a merchant backend (not Akurateco directly).
 * The backend is expected to expose the following endpoints:
 * - `POST /api/v1/session`
 * - `POST /api/v1/payment/status`
 * - `POST /api/v1/payment/refund`
 * - `POST /api/v1/payment/void`
 *
 * Error model:
 * - Non-200 responses become {@link PaymentBackendException} with status/body.
 * - Unexpected errors become {@link PaymentInitializationException}.
 */
export class HttpServiceService {
  constructor(
    private readonly backendUrl: string,
    private readonly merchantKey: string,
  ) {}

  /**
   * Performs a JSON POST and returns parsed JSON.
   *
   * @throws PaymentBackendException for non-200 responses.
   * @throws PaymentInitializationException for unexpected errors (network, parse, etc.).
   */
private async _postJson(url: string, body: Record<string, any>): Promise<any> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    if (res.status !== 200) {
      throw new PaymentBackendException('Server error', {
        status: res.status,
        body: text,
      });
    }

    return text ? JSON.parse(text) : {};
  } catch (e: any) {
    // --- максимально детальний лог ---
    const safeJson = (v: any) => {
      try {
        return JSON.stringify(v);
      } catch {
        return '[unserializable]';
      }
    };

    const errObj: any = e ?? {};
    const details = {
      url,
      method: 'POST',
      type: typeof e,
      isError: e instanceof Error,
      name: errObj?.name,
      message: errObj?.message ?? String(e),
      stack: errObj?.stack,
      code: errObj?.code,
      cause: errObj?.cause,
      rawKeys: errObj && typeof errObj === 'object' ? Object.keys(errObj) : undefined,
      status: errObj?.status,
      data: errObj?.data,
    };

    console.error('[Akurateco][_postJson] ERROR', details);

    // Якщо хочеш ще “розмазати” по рядках для читабельності в Logcat:
    console.error('[Akurateco][_postJson] message:', details.message);
    console.error('[Akurateco][_postJson] stack:', details.stack);

    // --- стандартна логіка ---
    if (e instanceof PaymentException) throw e;

    // Тут теж краще не String(e), а message + короткий json деталей
    throw new PaymentInitializationException(
      `Unexpected error: ${details.message} | details=${safeJson(details)}`
    );
  }
}

  /**
   * Creates a new payment session and returns a redirect URL.
   *
   * The request payload is based on {@link AkuratecoRequest.toJson}, then extended
   * with `merchant_key` and computed `hash`.
   */
  async fetchPaymentUrl(request: AkuratecoRequest): Promise<string> {
    const body: Record<string, any> =
      typeof (request as any).toJson === 'function' ? (request as any).toJson() : { ...(request as any) };

    body['merchant_key'] = this.merchantKey;
    body['hash'] = AkuratecoHashUtils.generateCheckoutHash({
      order: request.order,
      password: Akurateco.instance.password,
    });

    const data = await this._postJson(`${this.backendUrl}/api/v1/session`, body);

    const redirectUrl = data?.['redirect_url'];
    if (typeof redirectUrl !== 'string' || redirectUrl.length === 0) {
      throw new PaymentBackendException('Response does not contain redirect_url', {
        body: JSON.stringify(data),
      });
    }

    return redirectUrl;
  }

  /**
   * Requests payment status by `paymentId` or `orderId`.
   *
   * Hash is computed using the provided identifier.
   */
  async checkStatus(args: { paymentId?: string; orderId?: string }): Promise<CheckStatusResult> {
    const paymentId = args.paymentId;
    const orderId = args.orderId;

    const body: Record<string, any> = {
      merchant_key: this.merchantKey,
      ...(paymentId != null ? { payment_id: paymentId } : {}),
      ...(orderId != null ? { order_id: orderId } : {}),
      hash: AkuratecoHashUtils.generatePaymentIdHash({
        id: paymentId ?? (orderId as string),
        password: Akurateco.instance.password,
      }),
    };

    const data = await this._postJson(`${this.backendUrl}/api/v1/payment/status`, body);
    return CheckStatusResult.fromJson(data);
  }

  /**
   * Requests a refund operation.
   *
   * Returns backend-provided `result` string when available.
   */
  async refund(args: { paymentId: string; amount: string }): Promise<string> {
    const body: Record<string, any> = {
      merchant_key: this.merchantKey,
      payment_id: args.paymentId,
      amount: args.amount,
      hash: AkuratecoHashUtils.generateRefundHash({
        paymentId: args.paymentId,
        amount: args.amount,
        password: Akurateco.instance.password,
      }),
    };

    const data = await this._postJson(`${this.backendUrl}/api/v1/payment/refund`, body);
    return data?.['result'] ?? 'Unknown result';
  }

  /**
   * Requests a void operation.
   */
  async voidOperation(args: { paymentId: string }): Promise<AkuratecoVoid> {
    const body: Record<string, any> = {
      merchant_key: this.merchantKey,
      payment_id: args.paymentId,
      hash: AkuratecoHashUtils.generatePaymentIdHash({
        id: args.paymentId,
        password: Akurateco.instance.password,
      }),
    };

    const data = await this._postJson(`${this.backendUrl}/api/v1/payment/void`, body);
    return AkuratecoVoid.fromJson(data);
  }
}
