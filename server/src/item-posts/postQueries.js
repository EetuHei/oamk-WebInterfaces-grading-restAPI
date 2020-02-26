const getPostById = (knex, id) =>
  knex('post')
    .where({ id })
    .first();

const getPosts = knex => {
  return knex.from('post').select('*');
};

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
    date,
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
      date,
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
  {
    id,
    title,
    description,
    category,
    city,
    country,
    images,
    price,
    date,
    delivery
  }
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
      date,
      delivery
    });

const deletePost = (knex, id) => {
  const query = knex.raw(`DELETE FROM post WHERE id = ${id.id}`);
  return query;
};
//   knex('post')
//     .where({ id: id.id })
//     .del();
// };

module.exports = {
  insertPost,
  getPostById,
  getPosts,
  updatePostData,
  updatePostImage,
  deletePost
};
