import express from 'express';
import auth from './auth';
import user from './user';
import todoItem from './todoItem';

const routes = express.Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/todo_item', todoItem);

export default routes;
