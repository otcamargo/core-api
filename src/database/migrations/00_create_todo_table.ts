import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('todo_items', table => {
    table.increments('id').primary();
    table.string('user_id').notNullable();
    table.string('content').notNullable();
    table.integer('status').notNullable();
    table.timestamps();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('todo_items');
}
