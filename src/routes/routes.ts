import express from 'express';
import ToDoItemsController from '../controllers/toDoItemsController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import auth from "./auth";
import user from "./user";

const routes = express.Router();
const toDoItemsController = new ToDoItemsController();

routes.get('/todo_items', [checkJwt, checkRole(["ADMIN"])], toDoItemsController.index);
routes.post('/todo_items', [checkJwt, checkRole(["ADMIN"])], toDoItemsController.create);
routes.delete('/todo_items/:id', [checkJwt, checkRole(["ADMIN"])], toDoItemsController.delete);
routes.patch('/todo_items/:id', [checkJwt, checkRole(["ADMIN"])], toDoItemsController.update);

routes.use("/auth", auth);
routes.use("/user", user);

export default routes;
