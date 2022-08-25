/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('mensajes').del()
  await knex('mensajes').insert([
    {email:"prueba", FH:"23/08/2022 06:32:57", mensaje:"perueba "}
  ]);
};
