const knex = require("knex");
const knexConfig = require("../../../knexfile");

const builder = knex(knexConfig.development);

module.exports = builder;