/**
 * Recipient/payee information attached to a checkout request.
 */
export class Payee {
  readonly name: string;
  readonly email?: string | null;

  constructor(args: { name: string; email?: string | null }) {
    this.name = args.name;
    this.email = args.email ?? null;
  }

  /**
   * Creates an instance from a backend JSON payload.
   */
  static fromJson(json: any): Payee {
    return new Payee({
      name: json?.['name'],
      email: json?.['email'],
    });
  }

  /**
   * Serializes the payee to backend JSON format.
   */
  toJson(): Record<string, any> {
    return {
      name: this.name,
      email: this.email ?? null,
    };
  }
}
