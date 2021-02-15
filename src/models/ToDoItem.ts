import knex from '../database/connection';

class ToDoItem { 
  async all() {
    const toDoItems = await knex('todo_items').select('*');

    return toDoItems;
  }

  async create(user_id: Number, content: String, status: Number) {
    const trx = await knex.transaction();

    const toDoItem = {
      user_id,
      content,
      status,
    }

    await trx('todo_items').insert(toDoItem);

    await trx.commit();

    return toDoItem;
  }

  async update(id: Number, content: String, status: Number) {
    const updatedItem = await knex('todo_items').where('id', id).first().update({
      content: content,
      status: status
    });

    if(updatedItem) {
      const item = await knex('todo_items').where('id', id).first();
      return response.json(item);
    } else {
      return response.status(404).send({ error: response.statusCode });
    }
  }
}

export default ToDoItem;
