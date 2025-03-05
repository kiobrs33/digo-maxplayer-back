import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware para validar los resultados de las validaciones de express-validator.
 * Si hay errores de validación, devuelve una respuesta con un código 400 y los errores.
 * Si no hay errores, pasa al siguiente middleware o controlador.
 */
export const checkValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      ok: false,
      status: 'error',
      message: 'Error en la validación de campos',
      errors: errors.array(),
    });
    return;
  }

  next();
};
