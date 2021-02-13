import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('todo_items').insert([
    { user_id: '1', content: 'teste', status: 0 }
  ]);
}
