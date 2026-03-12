import { OpenPaymentPlatformHashUtils } from '../utils/hash_utils';
import { PaymentBackendException, PaymentException, PaymentInitializationException, } from '../exceptions/exceptions';
import { OpenPaymentPlatform } from '../openpaymentplatform';
import { OpenPaymentPlatformVoid } from '../models/openpaymentplatform_void';
import { CheckStatusResult } from '../models/check_status_model';
/**
 * Internal HTTP client used by {@link OpenPaymentPlatform}.
 *
 * This client uses `fetch` to call a merchant backend (not OpenPaymentPlatform directly).
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
    constructor(backendUrl, merchantKey) {
        this.backendUrl = backendUrl;
        this.merchantKey = merchantKey;
    }
    /**
     * Performs a JSON POST and returns parsed JSON.
     *
     * @throws PaymentBackendException for non-200 responses.
     * @throws PaymentInitializationException for unexpected errors (network, parse, etc.).
     */
    async _postJson(url, body) {
        var _a;
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
        }
        catch (e) {
            // --- максимально детальний лог ---
            const safeJson = (v) => {
                try {
                    return JSON.stringify(v);
                }
                catch {
                    return '[unserializable]';
                }
            };
            const errObj = e !== null && e !== void 0 ? e : {};
            const details = {
                url,
                method: 'POST',
                type: typeof e,
                isError: e instanceof Error,
                name: errObj === null || errObj === void 0 ? void 0 : errObj.name,
                message: (_a = errObj === null || errObj === void 0 ? void 0 : errObj.message) !== null && _a !== void 0 ? _a : String(e),
                stack: errObj === null || errObj === void 0 ? void 0 : errObj.stack,
                code: errObj === null || errObj === void 0 ? void 0 : errObj.code,
                cause: errObj === null || errObj === void 0 ? void 0 : errObj.cause,
                rawKeys: errObj && typeof errObj === 'object' ? Object.keys(errObj) : undefined,
                status: errObj === null || errObj === void 0 ? void 0 : errObj.status,
                data: errObj === null || errObj === void 0 ? void 0 : errObj.data,
            };
            console.error('[OpenPaymentPlatform][_postJson] ERROR', details);
            // Якщо хочеш ще “розмазати” по рядках для читабельності в Logcat:
            console.error('[OpenPaymentPlatform][_postJson] message:', details.message);
            console.error('[OpenPaymentPlatform][_postJson] stack:', details.stack);
            // --- стандартна логіка ---
            if (e instanceof PaymentException)
                throw e;
            // Тут теж краще не String(e), а message + короткий json деталей
            throw new PaymentInitializationException(`Unexpected error: ${details.message} | details=${safeJson(details)}`);
        }
    }
    /**
     * Creates a new payment session and returns a redirect URL.
     *
     * The request payload is based on {@link OpenPaymentPlatformRequest.toJson}, then extended
     * with `merchant_key` and computed `hash`.
     */
    async fetchPaymentUrl(request) {
        const body = typeof request.toJson === 'function' ? request.toJson() : { ...request };
        body['merchant_key'] = this.merchantKey;
        body['hash'] = OpenPaymentPlatformHashUtils.generateCheckoutHash({
            order: request.order,
            password: OpenPaymentPlatform.instance.password,
        });
        const data = await this._postJson(`${this.backendUrl}/api/v1/session`, body);
        const redirectUrl = data === null || data === void 0 ? void 0 : data['redirect_url'];
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
    async checkStatus(args) {
        const paymentId = args.paymentId;
        const orderId = args.orderId;
        const body = {
            merchant_key: this.merchantKey,
            ...(paymentId != null ? { payment_id: paymentId } : {}),
            ...(orderId != null ? { order_id: orderId } : {}),
            hash: OpenPaymentPlatformHashUtils.generatePaymentIdHash({
                id: paymentId !== null && paymentId !== void 0 ? paymentId : orderId,
                password: OpenPaymentPlatform.instance.password,
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
    async refund(args) {
        var _a;
        const body = {
            merchant_key: this.merchantKey,
            payment_id: args.paymentId,
            amount: args.amount,
            hash: OpenPaymentPlatformHashUtils.generateRefundHash({
                paymentId: args.paymentId,
                amount: args.amount,
                password: OpenPaymentPlatform.instance.password,
            }),
        };
        const data = await this._postJson(`${this.backendUrl}/api/v1/payment/refund`, body);
        return (_a = data === null || data === void 0 ? void 0 : data['result']) !== null && _a !== void 0 ? _a : 'Unknown result';
    }
    /**
     * Requests a void operation.
     */
    async voidOperation(args) {
        const body = {
            merchant_key: this.merchantKey,
            payment_id: args.paymentId,
            hash: OpenPaymentPlatformHashUtils.generatePaymentIdHash({
                id: args.paymentId,
                password: OpenPaymentPlatform.instance.password,
            }),
        };
        const data = await this._postJson(`${this.backendUrl}/api/v1/payment/void`, body);
        return OpenPaymentPlatformVoid.fromJson(data);
    }
}
//# sourceMappingURL=http_service.js.map