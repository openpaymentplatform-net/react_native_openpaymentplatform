/**
 * Base class for all library-specific exceptions.
 *
 * The checkout component and HTTP layer always try to surface errors as
 * `PaymentException` (or one of its subclasses) so consumers can reliably
 * handle them in a single `catch` / callback.
 */
export abstract class PaymentException extends Error {
  constructor(public readonly message: string) {
    super(message);
    this.name = 'PaymentException';
  }

  override toString() {
    return `${this.name}: ${this.message}`;
  }
}

export class PaymentInitializationException extends PaymentException {
  /**
   * Thrown when an unexpected error occurs (network failures, JSON parse errors,
   * missing initialization, etc.).
   */
  constructor(message: string) {
    super(message);
    this.name = 'PaymentInitializationException';
  }
}

export class PaymentBackendException extends PaymentException {
  /**
   * Thrown when the backend returns a non-success response or an invalid payload.
   *
   * The optional `response` field can contain the HTTP status code and raw body.
   */
  constructor(
    message: string,
    public readonly response?: { status?: number; body?: string },
  ) {
    super(message);
    this.name = 'PaymentBackendException';
  }

  override toString() {
    const status = this.response?.status;
    const body = this.response?.body ?? '';
    return `${this.name}: ${this.message}. Status code: ${status}. Response: ${body}`;
  }
}

export class PaymentWebViewException extends PaymentException {
  /**
   * Thrown when the WebView reports a loading/navigation error.
   */
  constructor(message: string) {
    super(message);
    this.name = 'PaymentWebViewException';
  }
}

export class PaymentCallbackException extends PaymentException {
  /**
   * Thrown when a user-provided callback throws.
   *
   * This prevents unhandled errors from crashing the checkout component.
   */
  constructor(message: string) {
    super(message);
    this.name = 'PaymentCallbackException';
  }
}
