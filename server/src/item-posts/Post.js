class Post {
  constructor({
    id,
    title,
    description,
    category,
    country,
    city,
    images,
    price,
    date,
    delivery,
    contactInfo
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.country = country;
    this.city = city;
    this.images = images;
    this.price = price;
    this.date = date;
    this.delivery = delivery;
    this.contactInfo = contactInfo;
  }
}

module.exports = Post;
