import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { TodoItem } from '../entity/TodoItem';

class ToDoItemsController {
  async index(request: Request, response: Response) {
    const userId = response.locals.jwtPayload.userId;
    const allItems = await getRepository(TodoItem).find({ where: { user_id: userId }, order: { id: 'ASC' } })

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
    const userId = response.locals.jwtPayload.userId;

    const newItem = {
      user_id: userId,
      content: request.body.content
    }

    const createdItem = await getRepository(TodoItem).save(newItem);
    return response.json(createdItem);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const userId = response.locals.jwtPayload.userId;
    const {
      content,
      status
    } = request.body

    const updatedItem = {
      user_id: userId,
      content: content,
      status: status
    }


    try {
      const outdatedItem = await getRepository(TodoItem).findOneOrFail(id);
      outdatedItem.content = updatedItem.content;
      outdatedItem.status = updatedItem.status;
      await getRepository(TodoItem).save(outdatedItem);
      return response.json(updatedItem);
    } catch (error) {
      response.status(404).send("Not found");
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const userId = response.locals.jwtPayload.userId;
    
    try {
      const deletedItem = await getRepository(TodoItem).findOneOrFail({ where: { user_id: userId, id: id }});
      await getRepository(TodoItem).delete(id);
      return response.json(deletedItem);
    } catch (error) {
      response.status(404).send("Not found");
    }
  }
}

export default ToDoItemsController;
