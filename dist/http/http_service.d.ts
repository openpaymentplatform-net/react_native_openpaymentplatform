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
export declare class HttpServiceService {
    private readonly backendUrl;
    private readonly merchantKey;
    constructor(backendUrl: string, merchantKey: string);
    /**
     * Performs a JSON POST and returns parsed JSON.
     *
     * @throws PaymentBackendException for non-200 responses.
     * @throws PaymentInitializationException for unexpected errors (network, parse, etc.).
     */
    private _postJson;
    /**
     * Creates a new payment session and returns a redirect URL.
     *
     * The request payload is based on {@link AkuratecoRequest.toJson}, then extended
     * with `merchant_key` and computed `hash`.
     */
    fetchPaymentUrl(request: AkuratecoRequest): Promise<string>;
    /**
     * Requests payment status by `paymentId` or `orderId`.
     *
     * Hash is computed using the provided identifier.
     */
    checkStatus(args: {
        paymentId?: string;
        orderId?: string;
    }): Promise<CheckStatusResult>;
    /**
     * Requests a refund operation.
     *
     * Returns backend-provided `result` string when available.
     */
    refund(args: {
        paymentId: string;
        amount: string;
    }): Promise<string>;
    /**
     * Requests a void operation.
     */
    voidOperation(args: {
        paymentId: string;
    }): Promise<AkuratecoVoid>;
}
//# sourceMappingURL=http_service.d.ts.map