const { Router } = require('express');
const passport = require('../config/passport/passport');
const postValidations = require('./postValidations');
const postServices = require('./postServices');
const postQueries = require('./postQueries');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const fs = require('fs');
// const host = req.host;
// const filePath = req.protocol + '://' + host + '/' + req.file.path;
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
          return res.data(null, { data });
        } catch (e) {
          throw e;
        }
      });
    });
  }
);

postRouter.post(
  '/create-post',
  passport.authenticate('jwt', { session: false }),
  postValidations.createPost,
  postItem
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

postRouter.get('/all-posts', getPosts);

module.exports = postRouter;
