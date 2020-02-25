const Post = require('./Post');
const postQueries = require('./postQueries');

const getPosts = async knex => {
  const getPostsData = await postQueries.getPosts();

  const posts = getPostsData;

  return posts;
};

const postItem = async (
  knex,
  { title, description, category, city, country, images, price, date, delivery }
) => {
  const postData = await knex.transaction(async trx => {
    const postId = await postQueries.insertPost(trx, {
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

    if (!postId) {
      throw new Error('Team could not be created.');
    }

    const postData = await postQueries.getPostById(trx, postId);

    return postData;
  });

  if (!postData) {
    throw new Error('Team data could not be retrieved.');
  }

  const post = new Post(postData);

  return post;
};

module.exports = { postItem, getPosts };
