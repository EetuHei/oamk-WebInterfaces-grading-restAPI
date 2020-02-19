const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const httpErrors = require('http-errors');
const authServices = require('../../../auth/authServices');

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'potato', //process.env.PASSPORT_SECRET
    passReqToCallback: true
  },
  async (req, payload, done) => {
    const { knex } = req.context;

    try {
      const user = await authServices.authenticateFromPayload(knex, payload);
      return done(null, user);
    } catch (e) {
      return done(httpErrors(401));
    }
  }
);

module.exports = jwtStrategy;
