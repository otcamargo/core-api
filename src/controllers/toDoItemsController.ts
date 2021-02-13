import { Request, Response } from 'express';
import knex from '../database/connection';

class ToDoItemsController {
  async index(request: Request, response: Response) {
    const toDoItems = await knex('todo_items').select('*');

    const serializedToDoItems = toDoItems.map(item => {
      return {
        id: item.id,
        user_id: item.user_id,
        content: item.content,
        status: item.status
      };
    });

    return response.json(serializedToDoItems);
  }

  async create(request: Request, response: Response) {
    const {
      user_id,
      content,
      status
    } = request.body

    const trx = await knex.transaction();

    const toDoItem = {
      user_id,
      content,
      status
    }

    console.log(toDoItem);

    const insertedItem = await trx('todo_items').insert(toDoItem);

    await trx.commit();

    return response.json({ toDoItem });
  }
}

export default ToDoItemsController;
