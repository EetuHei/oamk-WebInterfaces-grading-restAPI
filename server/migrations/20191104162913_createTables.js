const up = knex => {
  return knex.schema
    .createTable('user', table => {
      table.increments('id').primary();
      table
        .string('username', 50)
        .notNullable()
        .unique();
      table
        .string('email', 50)
        .notNullable()
        .unique();
      table.string('password', 255).notNullable();
      table.string('name', 50).notNullable();
      table.string('address', 50).notNullable();
      table.string('city', 50).notNullable();
      table.string('country', 50).notNullable();
      table.string('phoneNumber', 50).notNullable();
    })
    .createTable('post', table => {
      table.increments('id').primary();
      table
        .integer('itemOwnerId')
        .unsigned()
        .references('id')
        .inTable('user');
      table.string('title', 50).notNullable();
      table.string('description', 50).notNullable();
      table.string('category', 50).notNullable();
      table.string('city', 50).notNullable();
      table.string('country', 50).notNullable();
      table.enu('images', ['imageUri']);
      table.string('price', 255).notNullable();
      table.string('date', 50).notNullable();
      table.string('delivery', 50).notNullable();
    });
};

const down = knex => {
  return knex.schema.dropTableIfExists('post').dropTableIfExists('user');
};

module.exports = { up, down };
