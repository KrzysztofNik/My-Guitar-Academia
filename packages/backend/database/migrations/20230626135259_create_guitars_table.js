/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('guitars', (table) => {
        table.increments('id').primary()
        table.binary('guitarImage')
        table.string('guitarName').notNull()
        table.string('guitarModel')
        table.date('bought')
        table.date('year')
        table.float('price')
        table.date('stringChange')
        table.string('stringsProducer')
        table.string('stringThickness')
        table.date('lastCleaning')
        table.integer('ownerId').unsigned().references('id').inTable('users')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('guitars')
};
