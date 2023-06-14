/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcrypt')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
    await knex('users').insert([
        { id: 1, email: 'adam@overment.com', password: bcrypt.hashSync('12345',8) }
  ]);
};
