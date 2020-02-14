const up = knex => {
  return knex.schema.createTable("user", table => {
    table.increments("id").primary();
    table
      .string("username", 50)
      .notNullable()
      .unique();
    table.string("name", 50).notNullable();
    table
      .string("phonenumber", 50)
      .notNullable()
      .unique();
    table.string("age", 50).notNullable();
    table.string("streetAddress", 50).notNullable();
    table.string("city", 50).notNullable();
    table.string("country", 50).notNullable();
    table
      .string("email", 50)
      .notNullable()
      .unique();
    table.string("password", 255).notNullable();
  });
};

const down = knex => {
  return knex.schema.dropTableIfExists("user");
};

module.exports = { up, down };
