import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { checkValidationErrors } from '../middlewares/expressValidator.middleware';
import { filterWhitelist } from '../middlewares/filterFields.middleware';
import { AuthService } from './auth.service';

const authService = new AuthService();

export const validateLogin = [
  check('email', 'El correo electrónico es inválido.').isEmail(),
  check('password', 'La contraseña es requerida.').not().isEmpty(),
  check('password', 'La contraseña debe tener mínimo 6 caracteres')
    .if(check('password').exists())
    .isLength({
      min: 6,
      max: 12,
    }),
  (req: Request, res: Response, next: NextFunction) => {
    // Middleware para filtrar campos no deseados.
    req.body = filterWhitelist(req.body, ['email', 'password']);
    next();
  },
  checkValidationErrors,
];

export const validateRegister = [
  check('first_name', 'Los nombres son requeridos.').not().isEmpty(),
  check('last_name', 'Los apellidos son requeridos.').not().isEmpty(),
  check('email', 'El correo electrónico es requerido.').not().isEmpty(),
  check('email', 'El correo electrónico es inválido')
    .if(check('email').exists())
    .isEmail(),
  check('email')
    .if(check('email').exists())
    .custom(async (email) => {
      const user = await authService.verifyEmailUser(email);
      if (user) {
        throw new Error('El correo electrónico ya existe.');
      }
      return true;
    }),
  check('password', 'La contraseña es requerida.').not().isEmpty(),
  check('password', 'La contraseña debe tener mínimo 6 caracteres.')
    .if(check('password').exists())
    .isLength({
      min: 6,
      max: 12,
    }),
  check('address', 'La direccion es requerida.').not().isEmpty(),
  check('phone', 'El telefono es requerido.').not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    // Middleware para filtrar campos no deseados.
    req.body = filterWhitelist(req.body, [
      'first_name',
      'last_name',
      'email',
      'password',
      'address',
      'phone',
    ]);
    next();
  },
  checkValidationErrors,
];
