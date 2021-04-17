import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { TodoItem } from '../entity/TodoItem';

class ToDoItemsController {
  async index(request: Request, response: Response) {
    const userId = response.locals.jwtPayload.userId;
    const todoItemRepository = getRepository(TodoItem)
    const allItems = await todoItemRepository.find({ where: { userId: userId }, order: { id: 'ASC' } })

    return response.json(allItems);
  }

  async create(request: Request, response: Response) {
    const userId = response.locals.jwtPayload.userId;

    let todoItem = new TodoItem();
    todoItem.userId = userId;
    todoItem.title = request.body.title;
    todoItem.content = request.body.content;

    const todoItemRepository = getRepository(TodoItem)
    try {
      await todoItemRepository.save(todoItem);
    } catch (e) {
      return response.status(400).send();
    }

    return response.status(201).send(todoItem);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const userId = response.locals.jwtPayload.userId;
    const {
      content,
      status
    } = request.body

    const todoItemRepository = getRepository(TodoItem)
    let item;
    try {
      item = await todoItemRepository.findOneOrFail(id)
    } catch (error) {
      response.status(404).send("Item not found");
      return;
    }

    item.content = content;
    item.status = status;
    try {
      await todoItemRepository.save(item);
      return response.json(item);
    } catch (error) {
      response.status(404).send("Error");
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const userId = response.locals.jwtPayload.userId;
    
    const todoItemRepository = getRepository(TodoItem)

    let todoItem: TodoItem;
    try {
      todoItem = await todoItemRepository.findOneOrFail({ where: { userId: userId, id: id }});
    } catch (error) {
      response.status(404).send("Not found");
      return;
    }

    todoItemRepository.delete(id);

    response.status(204).send();
  }
}

export default ToDoItemsController;
