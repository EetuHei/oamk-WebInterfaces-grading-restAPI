const getPostById = (knex, id) =>
  knex('post')
    .where({ id })
    .first();

const getPosts = knex => {
  return knex.from('post').select('*');
};

const insertPost = (
  knex,
  { title, description, category, country, city, images, price, date, delivery }
) =>
  knex
    .insert({
      title,
      description,
      category,
      country,
      city,
      images,
      price,
      date,
      delivery
    })
    .into('post');

module.exports = { insertPost, getPostById, getPosts };
