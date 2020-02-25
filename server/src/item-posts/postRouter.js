const { Router } = require('express');
const passport = require('../config/passport/passport');
const postValidations = require('./postValidations');
const postServices = require('./postServices');
const postQueries = require('./postQueries');
const postRouter = new Router();

const getPosts = async (req, res, next) => {
  const { knex, getPostsData } = req.context;

  try {
    const posts = await postQueries.getPosts(knex, getPostsData);

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

postRouter.post(
  '/create-post',
  passport.authenticate('jwt', { session: false }),
  postValidations.createPost,
  postItem
);
postRouter.get('/all-posts', getPosts);

module.exports = postRouter;
