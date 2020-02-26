const LocalStrategy = require('passport-local').Strategy;
const authServices = require('../../../auth/authServices');
const httpErrors = require('http-errors');

const localStrategy = new LocalStrategy(
  {
    passReqToCallback: true
  },
  async (req, username, password, done) => {
    const { knex } = req.context;

    try {
      const user = await authServices.authenticateFromCredentials(knex, {
        usernameOrEmail: username,
        password
      });
      return done(null, user);
    } catch (e) {
      done(httpErrors(401));
    }
  }
);

module.exports = localStrategy;
