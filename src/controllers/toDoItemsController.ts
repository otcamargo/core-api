import { Request, Response } from 'express';
import knex from '../database/connection';

class ToDoItemsController {
  async index (request: Request, response: Response) {
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
}

export default ToDoItemsController;
