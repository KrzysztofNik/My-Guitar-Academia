/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
    await knex('guitars').del()
    await knex('guitars').insert([
        { id: 1, guitarName: 'Papierzak', guitarModel: 'Klasyk', bought: '2015-02-01', year: '2012-02-03' }
  ]);
};
