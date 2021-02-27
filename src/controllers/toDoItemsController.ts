import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { TodoItem } from '../entity/TodoItem';

class ToDoItemsController {
  async index(request: Request, response: Response) {
    const userId = response.locals.jwtPayload.userId;
    const todoItemsRepository = getRepository(TodoItem)
    const allItems = await todoItemsRepository.find({ where: { userId: userId }, order: { id: 'ASC' } })

    return response.json(allItems);
  }

  async create(request: Request, response: Response) {
    const userId = response.locals.jwtPayload.userId;

    let todoItem = new TodoItem();
    todoItem.userId = userId;
    todoItem.content = request.body.content;

    const todoItemsRepository = getRepository(TodoItem);
    try {
      await todoItemsRepository.save(todoItem);
    } catch (e) {
      return response.status(400).send();
    }

    return response.status(201).send("Created");
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const userId = response.locals.jwtPayload.userId;
    const {
      content,
      status
    } = request.body

    const updatedItem = {
      userId: userId,
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
      const deletedItem = await getRepository(TodoItem).findOneOrFail({ where: { userId: userId, id: id }});
      await getRepository(TodoItem).delete(id);
      return response.json(deletedItem);
    } catch (error) {
      response.status(404).send("Not found");
    }
  }
}

export default ToDoItemsController;
