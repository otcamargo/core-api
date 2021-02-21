import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { TodoItem } from '../entity/TodoItem';

class ToDoItemsController {
  async index(request: Request, response: Response) {
    const allItems = await getRepository(TodoItem).find({ order: { id: 'ASC'} })

    const serializedToDoItems = allItems.map(item => {
      return {
        user_id: item.user_id,
        content: item.content,
        status: item.status
      };
    });

    return response.json(allItems);
  }

  async create(request: Request, response: Response) {
    const createdItem = await getRepository(TodoItem).save(request.body);
    return response.json(createdItem);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      content,
      status
    } = request.body

    const updatedItem = {
      content: content,
      status: status
    }

    const outdatedItem = await getRepository(TodoItem).findOneOrFail(id);
    outdatedItem.content = updatedItem.content;
    outdatedItem.status = updatedItem.status;
    await getRepository(TodoItem).save(outdatedItem);

    return response.json(updatedItem);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    
    const deletedItem = await getRepository(TodoItem).findOne(id);
    await getRepository(TodoItem).delete(id);
    
    return response.json(deletedItem);
  }
}

export default ToDoItemsController;
