import { Router } from 'express';

import { validateLogin, validateRegister } from './auth.validator';
import { AuthController } from './auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/login', validateLogin, authController.postLogin);
router.post('/register', validateRegister, authController.postRegister);

export const AuthRoute = router;
