const Post = require('./Post');
const postQueries = require('./postQueries');

const getPosts = async knex => {
  const getPostsData = await postQueries.getPosts();

  const posts = getPostsData;

  return posts;
};

const postItem = async (
  knex,
  {
    itemOwnerId,
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
) => {
  const postData = await knex.transaction(async trx => {
    const postId = await postQueries.insertPost(trx, {
      itemOwnerId,
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
      throw new Error('Post could not be created.');
    }

    const postData = await postQueries.getPostById(trx, postId);

    return postData;
  });

  if (!postData) {
    throw new Error('Post data could not be retrieved.');
  }

  const post = new Post(postData);

  return post;
};

const editPostImage = async (knex, { id, itemOwnerId, images }) => {
  const updatePostImage = await knex.transaction(async trx => {
    const postData = await postQueries.getPostById(trx, id);

    if (postData.itemOwnerId !== itemOwnerId) {
      const error = new Error('The post does not belong to the user.');
      error.name = 'ForbiddenPost';
      throw error;
    }

    await postQueries.updatePostImage(trx, {
      id,
      images
    });
    const updatedPostData = await postQueries.getPostById(trx, id);

    return updatedPostData;
  });
  return updatePostImage;
};

const deletePost = async (knex, { id, itemOwnerId }) => {
  const updatedPostData = await knex.transaction(async trx => {
    const postData = await postQueries.getPostById(trx, id);

    if (postData.itemOwnerId !== itemOwnerId) {
      const error = new Error('The post does not belong to the user.');
      error.name = 'ForbiddenPost';
      throw error;
    }

    await postQueries.deletePost(trx, {
      id
    });
  });
  return updatedPostData;
};

const editPost = async (
  knex,
  {
    id,
    itemOwnerId,
    title,
    description,
    city,
    country,
    images,
    price,
    date,
    delivery
  }
) => {
  const updatedPostData = await knex.transaction(async trx => {
    const postData = await postQueries.getPostById(trx, id);

    if (postData.itemOwnerId !== itemOwnerId) {
      const error = new Error('The post does not belong to the user.');
      error.name = 'ForbiddenPost';
      throw error;
    }

    await postQueries.updatePostData(trx, {
      id,
      title,
      description,
      city,
      country,
      images,
      price,
      date,
      delivery
    });

    const updatedPostData = await postQueries.getPostById(trx, id);

    return updatedPostData;
  });

  return updatedPostData;
};

module.exports = { postItem, getPosts, editPost, editPostImage, deletePost };
