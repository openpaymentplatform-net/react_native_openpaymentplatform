
/**
 * Payment status values used by the backend.
 *
 * Note that some API strings differ from the enum names:
 * - `require3ds` <-> `3ds`
 * - `voided` <-> `void`
 */
export enum PaymentStatus {
  prepare = 'prepare',
  settled = 'settled',
  pending = 'pending',
  require3ds = 'require3ds',
  redirect = 'redirect',
  decline = 'decline',
  refund = 'refund',
  reversal = 'reversal',
  voided = 'voided',
  chargeback = 'chargeback',
}

/**
 * Converts a {@link PaymentStatus} enum value to the backend string representation.
 */
export function statusToString(status: PaymentStatus): string {
  switch (status) {
    case PaymentStatus.prepare:
      return 'prepare';
    case PaymentStatus.settled:
      return 'settled';
    case PaymentStatus.pending:
      return 'pending';
    case PaymentStatus.require3ds:
      return '3ds';
    case PaymentStatus.redirect:
      return 'redirect';
    case PaymentStatus.decline:
      return 'decline';
    case PaymentStatus.refund:
      return 'refund';
    case PaymentStatus.reversal:
      return 'reversal';
    case PaymentStatus.voided:
      return 'void';
    case PaymentStatus.chargeback:
      return 'chargeback';
    default:
      // exhaustive check
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unknown status: ${status}`);
  }
}

/**
 * Converts a backend string representation into {@link PaymentStatus}.
 *
 * @throws Error if `status` is unknown.
 */
export function stringToStatus(status: string): PaymentStatus {
  switch (status) {
    case 'prepare':
      return PaymentStatus.prepare;
    case 'settled':
      return PaymentStatus.settled;
    case 'pending':
      return PaymentStatus.pending;
    case '3ds':
      return PaymentStatus.require3ds;
    case 'redirect':
      return PaymentStatus.redirect;
    case 'decline':
      return PaymentStatus.decline;
    case 'refund':
      return PaymentStatus.refund;
    case 'reversal':
      return PaymentStatus.reversal;
    case 'void':
      return PaymentStatus.voided;
    case 'chargeback':
      return PaymentStatus.chargeback;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
}
