const { check, body, validationResult } = require('express-validator');
const httpError = require('http-errors');

const usernameCheck = body(
  'username',
  'Username should be at least 2 characters and maximum of 20 characters.'
)
  .trim()
  .not()
  .isEmpty()
  .isLength({ min: 2, max: 20 })
  .trim();

const emailCheck = body('email', 'Email is not valid.')
  .isEmail()
  .normalizeEmail();

const passwordCheck = body(
  'password',
  'Password should be at least 6 characters.'
).isLength({ min: 6 });

const passwordConfirmationCheck = body(
  'passwordConfirmation',
  'Password confirmation does not match password.'
).custom(
  (passwordConfirmation, { req }) => passwordConfirmation === req.body.password
);

const nameCheck = body('name', 'First name and family name is required')
  .not()
  .isEmpty()
  .isLength({ min: 2, max: 30 });

const addressCheck = body('address', 'address is required')
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

const phoneNumberCheck = body(
  'phoneNumber',
  'Phone number is required and has to be 10 characters long.'
)
  .trim()
  .not()
  .isEmpty()
  .isLength({ min: 10, max: 10 })
  .trim();

const validate = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);

  if (!errors.isEmpty()) {
    next(httpError(400, 'Validation error', { errors: errors.mapped() }));
  }

  const {
    username,
    email,
    password,
    name,
    address,
    city,
    country,
    phoneNumber
  } = req.body;

  req.context.userRegistrationData = {
    username,
    email,
    password,
    name,
    address,
    city,
    country,
    phoneNumber
  };

  next();
};

const userRegistration = [
  usernameCheck,
  emailCheck,
  passwordCheck,
  passwordConfirmationCheck,
  nameCheck,
  addressCheck,
  cityCheck,
  countryCheck,
  phoneNumberCheck,
  validate
];

module.exports = { usernameCheck, userRegistration };
