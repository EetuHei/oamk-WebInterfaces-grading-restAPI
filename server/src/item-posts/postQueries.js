const getPostById = (knex, id) =>
  knex('post')
    .where({ id })
    .first();

const getPosts = knex => knex.from('post');

const insertPost = (
  knex,
  {
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
  }
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
      delivery,
      contactInfo
    })
    .into('post');
