/**
 * Billing address details attached to a checkout request.
 */
export class BillingAddress {
    constructor(args) {
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
    static fromJson(json) {
        return new BillingAddress({
            country: json === null || json === void 0 ? void 0 : json['country'],
            state: json === null || json === void 0 ? void 0 : json['state'],
            city: json === null || json === void 0 ? void 0 : json['city'],
            district: json === null || json === void 0 ? void 0 : json['district'],
            address: json === null || json === void 0 ? void 0 : json['address'],
            houseNumber: json === null || json === void 0 ? void 0 : json['house_number'],
            zip: json === null || json === void 0 ? void 0 : json['zip'],
            phone: json === null || json === void 0 ? void 0 : json['phone'],
        });
    }
    /**
     * Serializes the address to backend JSON format.
     */
    toJson() {
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
//# sourceMappingURL=billing_address.js.map