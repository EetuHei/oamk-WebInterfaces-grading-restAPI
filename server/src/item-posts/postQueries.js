const getPostById = (knex, id) =>
  knex('post')
    .where({ id })
    .first();

const getPosts = knex => {
  return knex
    .select(
      'post.id',
      'post.itemOwnerId',
      'post.title',
      'post.description',
      'post.category',
      'post.city',
      'post.country',
      'post.images',
      'post.price',
      'post.created_at',
      'post.delivery',
      'user.name',
      'user.email',
      'user.phoneNumber'
    )
    .from('post')
    .join('user', 'user.id', '=', 'post.itemOwnerId');
};

const getPostByCategory = (knex, category) => {
  const categoryToStr = JSON.stringify(category.category);
  const query = knex.raw(
    `SELECT 
    post.id, 
    post.itemOwnerId, 
    post.title, 
    post.description, 
    post.category, 
    post.city, 
    post.country, 
    post.images, 
    post.price, 
    post.delivery, 
    post.created_at, 
    user.name, 
    user.email, 
    user.phoneNumber 
    FROM post INNER JOIN user ON user.id = post.itemOwnerId  WHERE category = ${categoryToStr}`
  );
  return query;
};

const getPostByCity = (knex, city) => {
  const cityToStr = JSON.stringify(city.city);
  const query = knex.raw(`SELECT
  post.id, 
  post.itemOwnerId, 
  post.title, 
  post.description, 
  post.category, 
  post.city, 
  post.country, 
  post.images, 
  post.price, 
  post.delivery, 
  post.created_at, 
  user.name, 
  user.email, 
  user.phoneNumber 
  FROM post INNER JOIN user ON user.id = post.itemOwnerId WHERE post.city = ${cityToStr}`);
  return query;
};

const getPostsByDate = knex =>
  knex
    .select(
      'post.id',
      'post.itemOwnerId',
      'post.title',
      'post.description',
      'post.category',
      'post.city',
      'post.country',
      'post.images',
      'post.price',
      'post.delivery',
      'post.created_at',
      'user.name',
      'user.email',
      'user.phoneNumber'
    )
    .from('post')
    .join('user', 'user.id', '=', 'post.itemOwnerId')
    .orderBy('created_at', 'desc');

const insertPost = (
  knex,
  {
    itemOwnerId,
    title,
    description,
    category,
    country,
    city,
    images,
    price,
    delivery
  }
) =>
  knex
    .insert({
      itemOwnerId,
      title,
      description,
      category,
      country,
      city,
      images,
      price,
      delivery
    })
    .into('post');

const updatePostImage = (knex, { id, images }) =>
  knex
    .table('post')
    .where({ id })
    .update({ images });

const updatePostData = (
  knex,
  { id, title, description, category, city, country, images, price, delivery }
) =>
  knex
    .table('post')
    .where({ id })
    .update({
      title,
      description,
      category,
      city,
      country,
      images,
      price,
      delivery
    });

const deletePost = (knex, id) => {
  const query = knex.raw(`DELETE FROM post WHERE id = ${id.id}`);
  return query;
};

module.exports = {
  insertPost,
  getPostById,
  getPosts,
  updatePostData,
  updatePostImage,
  deletePost,
  getPostByCategory,
  getPostByCity,
  getPostsByDate
};
