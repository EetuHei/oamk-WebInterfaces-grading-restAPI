const User = require('./User');
const authQueries = require('./authQueries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (
  knex,
  { username, email, password, name, address, city, country, phoneNumber }
) => {
  const saltRounds = 4;
  const hash = await bcrypt.hash(password, saltRounds);

  const userRegistered = !!(await authQueries.insertUser(knex, {
    username,
    email,
    name,
    address,
    city,
    country,
    phoneNumber,
    password: hash
  }));

  if (!userRegistered) {
    throw new Error('Registration failed.');
  }

  return userRegistered;
};

const authenticateFromCredentials = async (
  knex,
  { usernameOrEmail, password }
) => {
  const userData = await authQueries.getUserByUsernameOrEmail(
    knex,
    usernameOrEmail
  );

  const match = userData && (await bcrypt.compare(password, userData.password));

  if (!match) {
    throw new Error('Authentication failed.');
  }

  const user = new User(userData);

  return user;
};

const authenticateFromPayload = async (knex, payload) => {
  const { id } = payload;

  const userData = await authQueries.getUserById(knex, id);

  if (!userData) {
    throw new Error('Authentication failed.');
  }

  const user = new User(userData);

  return user;
};

const signAccessToken = id => {
  const accessToken = jwt.sign({ id }, 'potato');
  return accessToken;
};

module.exports = {
  registerUser,
  authenticateFromCredentials,
  authenticateFromPayload,
  signAccessToken
};
