import express from 'express';
import ToDoItemsController from '../controllers/toDoItemsController';
import auth from "./auth";
import user from "./user";

const routes = express.Router();
const toDoItemsController = new ToDoItemsController();

routes.get('/todo_items', toDoItemsController.index);
routes.post('/todo_items', toDoItemsController.create);
routes.delete('/todo_items/:id', toDoItemsController.delete);
routes.patch('/todo_items/:id', toDoItemsController.update);

routes.use("/auth", auth);
routes.use("/user", user);

export default routes;



//https://js.plainenglish.io/creating-a-rest-api-with-jwt-authentication-and-role-based-authorization-using-typescript-fbfa3cab22a4