class User {
  constructor({
    id,
    username,
    email,
    name,
    address,
    city,
    country,
    phoneNumber
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
    this.phoneNumber = phoneNumber;
  }
}

module.exports = User;
