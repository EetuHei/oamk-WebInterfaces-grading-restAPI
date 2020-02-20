const Post = require('./Post');
const postQueries = require('./postQueries');

const getPosts = async knex => {
  const postsData = await postQueries.getPosts;

  const posts = postsData;

  return posts;
};

const postItem = async (
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
) => {
  const createPost = !!(await postQueries.insertPost(knex, {
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
  }));

  if (!createPost) {
    throw new Error('Could not create the post.');
  }

  return createPost;
};

module.exports = { postItem };
