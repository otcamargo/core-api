import { Request, Response } from 'express';
import knex from '../database/connection';
import ToDoItem from '../models/ToDoItem';

class ToDoItemsController {
  async index(request: Request, response: Response) {
    const toDoItemModel = new ToDoItem();
    const allItems = await toDoItemModel.all();

    const serializedToDoItems = allItems.map(item => {
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

    const toDoItemModel = new ToDoItem();
    const created_item = await toDoItemModel.create(user_id, content, status);

    return response.json(created_item);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      content,
      status
    } = request.body

    const toDoItemModel = new ToDoItem();
    const updatedItem = await toDoItemModel.update(id, content, status);

    if (updatedItem) {
      return response.json(updatedItem);
    } else {
      return response.status(404).send({ error: response.statusCode });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const toDoItemModel = new ToDoItem();
    const deletedItem = await toDoItemModel.delete(id);

    if(deletedItem) {
      return response.json(deletedItem);
    } else {
      return response.status(404).send({ error: response.statusCode });
    }
  }
}

export default ToDoItemsController;
