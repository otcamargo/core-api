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

    const insertedItem = await trx('todo_items').insert(toDoItem);

    await trx.commit();

    return response.json({ toDoItem });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      content,
      status
    } = request.body

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

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const item = await knex('todo_items').where('id', id).first();

    if(item) {
      await knex('todo_items').where('id', id).first().delete();
      return response.json(item);
    } else {
      return response.status(404).send({ error: response.statusCode });
    }
  }
}

export default ToDoItemsController;
