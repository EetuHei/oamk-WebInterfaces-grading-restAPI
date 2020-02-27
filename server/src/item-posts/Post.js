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
    this.images = images;
    this.price = price;
    this.delivery = delivery;
    this.contactInfo = contactInfo;
  }
}

module.exports = Post;
