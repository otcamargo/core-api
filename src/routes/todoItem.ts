import ToDoItemsController from '../controllers/toDoItemsController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import router from './auth';

const toDoItemsController = new ToDoItemsController();

router.get('/', [checkJwt, checkRole(["ADMIN"])], toDoItemsController.index);
router.post('/', [checkJwt, checkRole(["ADMIN"])], toDoItemsController.create);
router.delete('/:id', [checkJwt, checkRole(["ADMIN"])], toDoItemsController.delete);
router.patch('/:id', [checkJwt, checkRole(["ADMIN"])], toDoItemsController.update);

export default router;
