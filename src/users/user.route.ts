import { Router } from 'express';
import { UserController } from './user.controller';
import { validateToken } from '../middlewares/validateToken.middleware';
import { validateRole } from '../middlewares/validateRole.middleware';

const router = Router();
const userController = new UserController();

router.get(
  '/',
  validateToken,
  validateRole(['admin']),
  userController.getUsers
);
router.get('/:id', validateToken, userController.getOneUser);
router.post('/', validateToken, userController.createUser);
router.put(
  '/:id',
  validateToken,
  validateRole(['admin']),
  userController.updateUser
);
router.delete(
  '/:id',
  validateToken,
  validateRole(['admin']),
  userController.deleteUser
);

export const UserRoute = router;
