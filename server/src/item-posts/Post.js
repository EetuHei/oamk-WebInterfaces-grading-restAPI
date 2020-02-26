class Post {
  constructor({
    id,
    itemOwnerId,
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
    this.itemOwnerId = itemOwnerId;
    this.title = title;
    this.description = description;
    this.category = category;
    this.country = country;
    this.city = city;
    this.images = [];
    this.price = price;
    this.date = date;
    this.delivery = delivery;
    this.contactInfo = contactInfo;
  }
}

module.exports = Post;
