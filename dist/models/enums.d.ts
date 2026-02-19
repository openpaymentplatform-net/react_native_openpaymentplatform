/**
 * Payment status values used by the backend.
 *
 * Note that some API strings differ from the enum names:
 * - `require3ds` <-> `3ds`
 * - `voided` <-> `void`
 */
export declare enum PaymentStatus {
    prepare = "prepare",
    settled = "settled",
    pending = "pending",
    require3ds = "require3ds",
    redirect = "redirect",
    decline = "decline",
    refund = "refund",
    reversal = "reversal",
    voided = "voided",
    chargeback = "chargeback"
}
/**
 * Converts a {@link PaymentStatus} enum value to the backend string representation.
 */
export declare function statusToString(status: PaymentStatus): string;
/**
 * Converts a backend string representation into {@link PaymentStatus}.
 *
 * @throws Error if `status` is unknown.
 */
export declare function stringToStatus(status: string): PaymentStatus;
//# sourceMappingURL=enums.d.ts.map