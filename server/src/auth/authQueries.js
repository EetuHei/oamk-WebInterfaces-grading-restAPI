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
  knex, { username, name, address, city, country, email, phoneNumber, password }) =>
    knex('user').insert({
        username,
        name,
        address,
        city,
        country,
        email,
        phoneNumber,
        password });

module.exports = { getUserById, getUserByUsernameOrEmail, insertUser };