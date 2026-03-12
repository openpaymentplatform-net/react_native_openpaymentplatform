import { OpenPaymentPlatformOrder } from '../models/openpaymentplatform_order';
/**
 * Hash/signature helpers used by the backend API.
 *
 * The current algorithm is:
 * 1) Concatenate input fields into a single string (see methods below)
 * 2) Uppercase the full string
 * 3) MD5(UTF-8(uppercased)) -> hex string
 * 4) SHA1(UTF-8(md5Hex)) -> hex string
 *
 * Note: this implementation is deterministic and has no side effects.
 */
export declare class OpenPaymentPlatformHashUtils {
    /**
     * Generates a hash for creating a checkout session.
     *
     * Input concatenation order:
     * `order.number + order.amount + order.currency + order.description + password`
     */
    static generateCheckoutHash(args: {
        order: OpenPaymentPlatformOrder;
        password: string;
    }): string;
    /**
     * Generates a hash based on a single identifier (payment id or order id).
     *
     * Input concatenation order: `id + password`
     */
    static generatePaymentIdHash(args: {
        id: string;
        password: string;
    }): string;
    /**
     * Generates a hash for refund operations.
     *
     * Input concatenation order: `paymentId + amount + password`
     */
    static generateRefundHash(args: {
        paymentId: string;
        amount: string;
        password: string;
    }): string;
    private static _generateHash;
}
//# sourceMappingURL=hash_utils.d.ts.map