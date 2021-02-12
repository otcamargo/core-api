import express from 'express';
import ToDoItemsController from '../controllers/toDoItemsController';

const routes = express.Router();
const toDoItemsController = new ToDoItemsController();

routes.get('/todo_items', toDoItemsController.index);

export default routes;
