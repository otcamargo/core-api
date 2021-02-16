import knex from '../database/connection';

class ToDoItem { 
  async all() {
    const toDoItems = await knex('todo_items').select('*');

    return toDoItems;
  }

  async create(user_id: Number, content: String, status: Number) {
    const toDoItem = {
      user_id,  
      content,
      status,
    }

    const trx = await knex.transaction();
    
    await trx('todo_items').insert(toDoItem);
    
    await trx.commit();

    return toDoItem;
  }

  async update(id: String, content: String, status: Number) {
    const updatedItem = await knex('todo_items').where('id', id).first().update({
      content: content,
      status: status
    });

    if(updatedItem) {
      const item = await knex('todo_items').where('id', id).first();
      return item;
    } else {
      return null;
    }
  }

  async delete(id: String) {
    const item = await knex('todo_items').where('id', id).first();
    if(item) {
      await knex('todo_items').where('id', id).first().delete();
      return item;
    } else {
      return null;
    }
  }
}

export default ToDoItem;
