const getUserById = (knex, id) =>
  knex('user')
    .where({ id })
    .first();

const getUserByUsernameOrEmail = (knex, usernameOrEmail) =>
  knex('user')
    .where({ username: usernameOrEmail })
    .orWhere({ email: usernameOrEmail })
    .first();

const insertUser = (
  knex,
  { username, email, password, name, address, city, country, phoneNumber }
) =>
  knex('user').insert({
    username,
    email,
    password,
    name,
    address,
    city,
    country,
    phoneNumber
  });

module.exports = { getUserById, getUserByUsernameOrEmail, insertUser };
