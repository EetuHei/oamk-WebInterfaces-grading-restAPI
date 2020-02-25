const seed = async knex => {
  await knex('user').del();
  await knex('item').del();
};

module.exports = { seed };
