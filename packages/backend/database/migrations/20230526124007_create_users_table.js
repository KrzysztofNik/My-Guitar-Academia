/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('users', table => {
    table.charset('utf8mb4');
    table.increments('id');
    table.string('email').notNullable();
    table.string('displayName').notNullable();
    table.string('phone');
    table.string('photoUrl');
    table.string('password').notNullable();
    table.string('lang').notNullable().defaultTo('pl');
    table.datetime('emailVerifiedAt');
    table.datetime('createdAt').defaultTo(knex.fn.now());
    table.datetime('updatedAt').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('users');
};
