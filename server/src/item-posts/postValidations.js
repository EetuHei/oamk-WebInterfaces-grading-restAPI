const { check, body, validationResult } = require('express-validator');
const httpError = require('http-errors');

const titleCheck = body('title', 'Title should be atleast 2 characters long.')
  .trim()
  .not()
  .isEmpty()
  .isLength({ min: 2, max: 50 })
  .trim();

const descriptionCheck = body('description', 'Description is required')
  .not()
  .isEmpty()
  .isLength({ min: 2, max: 500 });

const categoryCheck = body('category', 'category is required')
  .not()
  .trim()
  .isEmpty();

const cityCheck = body('city', 'City is required')
  .trim()
  .not()
  .isEmpty()
  .trim();

const countryCheck = body(
  'country',
  'Country should be represented with two letters'
)
  .trim()
  .not()
  .isEmpty()
  .isLength({ min: 2, max: 4 })
  .trim();

const priceCheck = body('price', 'Your post must have a price.')
  .trim()
  .not()
  .isEmpty()
  .trim();

const deliveryCheck = body('delivery', 'You must show delivery options.')
  .trim()
  .not()
  .isEmpty();

const validate = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);

  if (!errors.isEmpty()) {
    next(httpError(400, 'Validation error', { errors: errors.mapped() }));
  }

  const {
    title,
    description,
    category,
    country,
    city,
    images,
    price,
    delivery
  } = req.body;
  const itemOwnerId = req.user.id;
  req.context.postData = {
    itemOwnerId,
    title,
    description,
    category,
    country,
    city,
    images,
    price,
    delivery
  };
  next();
};

const postByCategory = [
  (req, res, next) => {
    const category = req.params.category;

    req.context.getPostDataByCategory = {
      category: category
    };

    return next();
  }
];

const postByCity = [
  (req, res, next) => {
    const city = req.params.city;

    req.context.getPostDataByCity = {
      city: city
    };

    return next();
  }
];

const createPost = [
  titleCheck,
  descriptionCheck,
  categoryCheck,
  cityCheck,
  countryCheck,
  priceCheck,
  deliveryCheck,
  validate,
  (req, res, next) => {
    const {
      title,
      description,
      category,
      country,
      city,
      images,
      price,
      delivery
    } = req.body;
    const itemOwnerId = req.user.id;

    req.context.itemPostData = {
      itemOwnerId,
      title,
      description,
      category,
      country,
      city,
      images,
      price,
      delivery
    };

    return next();
  }
];

const imageUploadData = [
  validate,
  (req, res, next) => {
    const { images } = req.body;
    const id = req.params.id;
    const itemOwnerId = req.user.id;

    req.context.addImagesData = {
      id: Number(id),
      itemOwnerId: itemOwnerId,
      images
    };

    return next();
  }
];

const postDelete = [
  validate,
  (req, res, next) => {
    const id = req.params.id;
    const itemOwnerId = req.user.id;

    req.context.deletePostData = {
      id: Number(id),
      itemOwnerId: itemOwnerId
    };
    return next();
  }
];

const postUpdate = [
  titleCheck,
  descriptionCheck,
  categoryCheck,
  cityCheck,
  countryCheck,
  priceCheck,
  deliveryCheck,
  validate,
  (req, res, next) => {
    const {
      title,
      description,
      category,
      country,
      city,
      images,
      price,
      delivery
    } = req.body;
    const id = req.params.id;
    const itemOwnerId = req.user.id;

    req.context.editPostData = {
      id: Number(id),
      itemOwnerId: itemOwnerId,
      title,
      description,
      category,
      country,
      city,
      images,
      price,
      delivery
    };

    return next();
  }
];

module.exports = {
  createPost,
  postUpdate,
  imageUploadData,
  postDelete,
  postByCategory,
  postByCity
};
