const { check, body, validationResult } = require("express-validator");
const httpError = require("http-errors");

const usernameCheck = body(
  "username",
  "Username should be at least 2 characters and maximum of 20 characters."
)
  .trim()
  .not()
  .isEmpty()
  .isLength({ min: 2, max: 20 })
  .trim();

const nameCheck = body("name", "First name and family name is required")
  .not()
  .isEmpty()
  .isLength({ min: 2, max: 30 });

const addressCheck = body("Address", "address is required")
  .not()
  .isEmpty();

const cityCheck = body("city", "City is required")
  .trim()
  .not()
  .isEmpty()
  .trim();

const countryCheck = body(
  "country",
  "Country should be represented with two letters"
)
  .trim()
  .not()
  .isEmpty()
  .isLength({ min: 2, max: 4 })
  .trim();

const emailCheck = body("email", "Email is not valid.")
  .isEmail()
  .normalizeEmail();

const phoneNumberCheck = body("Phone number", "Phonenumber is required.")
  .trim()
  .not()
  .isEmpty()
  .isLength({ min: 10, max: 10 })
  .trim();

const passwordCheck = body(
  "password",
  "Password should be at least 6 characters."
).isLength({ min: 6 });

const passwordConfirmationCheck = body(
  "passwordConfirmation",
  "Password confirmation does not match password."
).custom(
  (passwordConfirmation, { req }) => passwordConfirmation === req.body.password
);

const validate = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);

  if (!errors.isEmpty()) {
    next(httpError(400, "Validation error", { errors: errors.mapped() }));
  }

  const {
    username,
    name,
    address,
    city,
    country,
    email,
    phoneNumber,
    password,
    passwordConfirmation
  } = req.body;

  req.context.userRegistrationData = {
    username,
    name,
    address,
    city,
    country,
    email,
    phoneNumber,
    password,
    passwordConfirmation
  };
  next();
};

const userRegistration = [
  usernameCheck,
  nameCheck,
  ageCheck,
  addressCheck,
  cityCheck,
  countryCheck,
  emailCheck,
  phoneNumberCheck,
  passwordCheck,
  passwordConfirmationCheck,
  validate
];

module.exports = { usernameCheck, userRegistration };
