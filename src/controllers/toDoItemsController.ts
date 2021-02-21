import { Request, Response } from 'express';
import {getRepository} from "typeorm";
import { TodoItems } from '../entity/TodoItems';

class ToDoItemsController {
  async index(request: Request, response: Response) {
    const allItems = await getRepository(TodoItems).find({ order: { id: 'ASC'} })

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
    const createdItem = await getRepository(TodoItems).save(request.body);
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
    await getRepository(TodoItems).update(id, updatedItem);

    return response.json(updatedItem);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    
    const deletedItem = await getRepository(TodoItems).findOne(id);
    await getRepository(TodoItems).delete(id);
    
    return response.json(deletedItem);
  }
}

export default ToDoItemsController;
