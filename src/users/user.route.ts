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
router.get('/:id', userController.getOneUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete(
  '/:id',

  userController.deleteUser
);

export const UserRoute = router;
