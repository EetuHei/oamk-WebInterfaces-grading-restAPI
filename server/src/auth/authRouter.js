const { Router } = require('express');
const passport = require('../config/passport/passport');
const httpErrors = require('http-errors');
const authServices = require('./authServices');
const authValidations = require('./authValidations');
const { validate } = require('../config/utils');

const authRouter = new Router();

const registerUser = async (req, res, next) => {
  const { knex, userRegistrationData } = req.context;

  try {
    const userRegistered = await authServices.registerUser(
      knex,
      userRegistrationData
    );

    return res.data();
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      const forbiddenError = httpErrors(
        403,
        `User '${userRegistrationData.username}' already exists`
      );
      return next(forbiddenError);
    }
    return next(e);
  }
};

const getAccessToken = (req, res, next) => {
  const accessToken = authServices.signAccessToken(req.user.id);
  return res.data(null, { accessToken });
};

authRouter.post('/register', authValidations.userRegistration, registerUser);
authRouter.post(
  '/token',
  passport.authenticate('local', { session: false }),
  getAccessToken
);

module.exports = authRouter;
