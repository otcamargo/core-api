import express from 'express';
import ToDoItemsController from '../controllers/toDoItemsController';

const routes = express.Router();
const toDoItemsController = new ToDoItemsController();

routes.get('/todo_items', toDoItemsController.index);
routes.post('/todo_items', toDoItemsController.create);
routes.delete('/todo_items/:id', toDoItemsController.delete);
routes.patch('/todo_items/:id', toDoItemsController.update);

export default routes;
