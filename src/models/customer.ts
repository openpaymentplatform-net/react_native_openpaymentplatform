/**
 * Customer details optionally attached to a checkout request.
 */
export class Customer {
  readonly name: string;
  readonly email: string;
  readonly digitalWallet?: string | null;

  constructor(args: { name: string; email: string; digitalWallet?: string | null }) {
    this.name = args.name;
    this.email = args.email;
    this.digitalWallet = args.digitalWallet ?? null;
  }

  /**
   * Creates an instance from a backend JSON payload.
   */
  static fromJson(json: any): Customer {
    return new Customer({
      name: json?.['name'],
      email: json?.['email'],
      digitalWallet: json?.['digital_wallet'],
    });
  }

  /**
   * Serializes the customer to JSON expected by the backend.
   */
  toJson(): Record<string, any> {
    return {
      name: this.name,
      email: this.email,
      ...(this.digitalWallet != null ? { digital_wallet: this.digitalWallet } : {}),
    };
  }
}
