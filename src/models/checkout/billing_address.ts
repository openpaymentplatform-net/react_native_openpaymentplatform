/**
 * Billing address details attached to a checkout request.
 */
export class BillingAddress {
  readonly country: string;
  readonly state: string;
  readonly city: string;
  readonly district: string;
  readonly address: string;
  readonly houseNumber: string;
  readonly zip: string;
  readonly phone: string;

  constructor(args: {
    country: string;
    state: string;
    city: string;
    district: string;
    address: string;
    houseNumber: string;
    zip: string;
    phone: string;
  }) {
    this.country = args.country;
    this.state = args.state;
    this.city = args.city;
    this.district = args.district;
    this.address = args.address;
    this.houseNumber = args.houseNumber;
    this.zip = args.zip;
    this.phone = args.phone;
  }

  /**
   * Creates an instance from a backend JSON payload.
   */
  static fromJson(json: any): BillingAddress {
    return new BillingAddress({
      country: json?.['country'],
      state: json?.['state'],
      city: json?.['city'],
      district: json?.['district'],
      address: json?.['address'],
      houseNumber: json?.['house_number'],
      zip: json?.['zip'],
      phone: json?.['phone'],
    });
  }

  /**
   * Serializes the address to backend JSON format.
   */
  toJson(): Record<string, any> {
    return {
      country: this.country,
      state: this.state,
      city: this.city,
      district: this.district,
      address: this.address,
      house_number: this.houseNumber,
      zip: this.zip,
      phone: this.phone,
    };
  }
}
