const seed = async knex => {
    await knex('user').del();
  };
  
  module.exports = { seed };