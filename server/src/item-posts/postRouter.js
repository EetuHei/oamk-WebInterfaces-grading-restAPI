const { Router } = require('express');

const postRouter = new Router();

const getPosts = async (req, res, next) => {
  const { knex, getPostsData } = req.context;

  try {
    const posts = await postServices.getPosts(knex, getPostsData);

    return res.data(200, { posts });
  } catch (e) {
    return next(e);
  }
};

const postItem = async (req, res, next) => {
  const { knex, postData } = req.context;

  try {
    const post = await postServices.postItem(knex, postData);

    return res.data(201, { post });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      const forbiddenError = httpErrors(403, 'Post already exists');
      return next(forbiddenError);
    }
    return next(e);
  }
};

postRouter.post('/posts', postValidations.createPost, postItem);

module.exports = postRouter;
