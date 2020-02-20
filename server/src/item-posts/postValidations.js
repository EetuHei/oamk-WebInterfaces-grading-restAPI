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

const dateCheck = body('date', 'Your post must have a creation date.')
  .trim()
  .not()
  .isEmpty()
  .trim();

const deliveryCheck = body('delivery', 'You must show delivery options.')
  .trim()
  .not()
  .isEmpty()
  .trim();

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
    date,
    delivery,
    contactInfo
  } = req.body;

  req.context.postData = {
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
  };
  next();
};

const createPost = [
  titleCheck,
  descriptionCheck,
  categoryCheck,
  cityCheck,
  countryCheck,
  priceCheck,
  dateCheck,
  deliveryCheck,
  validate
];

module.exports = { usernameCheck, createPost };
