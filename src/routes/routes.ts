import express from 'express';
import ToDoItemsController from '../controllers/toDoItemsController';

const routes = express.Router();
const toDoItemsController = new ToDoItemsController();

routes.get('/todo_items', toDoItemsController.index);
routes.post('/todo_items', toDoItemsController.create);

export default routes;
