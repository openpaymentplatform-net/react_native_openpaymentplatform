import * as CryptoJS from 'crypto-js';
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
export class AkuratecoHashUtils {
    /**
     * Generates a hash for creating a checkout session.
     *
     * Input concatenation order:
     * `order.number + order.amount + order.currency + order.description + password`
     */
    static generateCheckoutHash(args) {
        const { order, password } = args;
        const toMd5 = `${order.number}${order.amount}${order.currency}${order.description}${password}`;
        return this._generateHash(toMd5);
    }
    /**
     * Generates a hash based on a single identifier (payment id or order id).
     *
     * Input concatenation order: `id + password`
     */
    static generatePaymentIdHash(args) {
        const toMd5 = `${args.id}${args.password}`;
        return this._generateHash(toMd5);
    }
    /**
     * Generates a hash for refund operations.
     *
     * Input concatenation order: `paymentId + amount + password`
     */
    static generateRefundHash(args) {
        const toMd5 = `${args.paymentId}${args.amount}${args.password}`;
        return this._generateHash(toMd5);
    }
    static _generateHash(toMd5) {
        const upper = toMd5.toUpperCase();
        const md5Hex = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(upper)).toString(CryptoJS.enc.Hex);
        const sha1Hex = CryptoJS.SHA1(CryptoJS.enc.Utf8.parse(md5Hex)).toString(CryptoJS.enc.Hex);
        return sha1Hex;
    }
}
//# sourceMappingURL=hash_utils.js.map