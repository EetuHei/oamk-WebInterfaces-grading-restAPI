const seed = async knex => {
  await knex('user').del();
  await knex('post').del();
};

module.exports = { seed };
