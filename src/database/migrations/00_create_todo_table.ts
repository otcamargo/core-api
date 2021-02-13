import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('todo_items', table => {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.string('content').notNullable();
    table.integer('status').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('todo_items');
}
