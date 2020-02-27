const { Router } = require('express');
const passport = require('../config/passport/passport');
const postValidations = require('./postValidations');
const postServices = require('./postServices');
const postQueries = require('./postQueries');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const fs = require('fs');
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

const getPostByCategory = async (req, res, next) => {
  const { knex, getPostDataByCategory } = req.context;

  try {
    const postsByCategory = await postQueries.getPostByCategory(
      knex,
      getPostDataByCategory
    );
    const mappedDataByCategory = [];
    postsByCategory[0].forEach(data => {
      mappedDataByCategory.push(data);
    });
    return res.data(200, { mappedDataByCategory });
  } catch (e) {
    throw e;
  }
};

const getPostByCity = async (req, res, next) => {
  const { knex, getPostDataByCity } = req.context;

  try {
    const postsByCity = await postQueries.getPostByCity(
      knex,
      getPostDataByCity
    );
    const mappedDataByCity = [];
    postsByCity[0].forEach(data => {
      mappedDataByCity.push(data);
    });
    return res.data(200, { mappedDataByCity });
  } catch (e) {
    throw e;
  }
};

const getPostsByDate = async (req, res, next) => {
  const { knex, getPostsData } = req.context;

  try {
    const posts = await postQueries.getPostsByDate(knex, getPostsData);

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
postRouter.get('/all-posts/sort-by/date', getPostsByDate);
postRouter.get(
  '/sort-by/category/:category',
  postValidations.postByCategory,
  getPostByCategory
);
postRouter.get(
  '/sort-by/location/:city',
  postValidations.postByCity,
  getPostByCity
);

postRouter.put(
  '/add-image/:id',
  upload.array('img', 4),
  passport.authenticate('jwt', { session: false }),
  postValidations.imageUploadData,
  async (req, res, next) => {
    const images = req.files;
    const { knex, addImagesData } = req.context;

    images.forEach(img => {
      fs.rename(img.path, `./uploads/${img.originalname}`, err => {
        if (err) throw err;
        console.log('image rename success');
        try {
          const data = postServices.editPostImage(knex, addImagesData);
          return res.data(200, { data: 'Added images.' });
        } catch (e) {
          throw e;
        }
      });
    });
  }
);

postRouter.put(
  '/edit-post/:id',
  passport.authenticate('jwt', { session: false }),
  [
    postValidations.postUpdate,
    async (req, res, next) => {
      const { knex, editPostData } = req.context;

      try {
        const data = await postServices.editPost(knex, editPostData);
        return res.data(null, { data });
      } catch (e) {
        throw e;
      }
    }
  ]
);

postRouter.delete(
  '/delete-post/:id',
  passport.authenticate('jwt', { session: false }),
  [
    postValidations.postDelete,
    async (req, res, next) => {
      const { knex, deletePostData } = req.context;

      try {
        const data = await postServices.deletePost(knex, deletePostData);
        return res.data(null, { data: 'Post deleted successfully.' });
      } catch (e) {
        throw e;
      }
    }
  ]
);

module.exports = postRouter;
