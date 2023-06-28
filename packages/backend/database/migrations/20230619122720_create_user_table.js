/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('surname').notNull()
        table.string('email').unique().notNull()
        table.string('password').notNull()
        table.string('refreshToken')
        table.timestamps(false, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};
