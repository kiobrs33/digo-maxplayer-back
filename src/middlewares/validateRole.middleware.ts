import { NextFunction, Response } from 'express';
import { ISessionRequest } from '../interfaces/session.interfaces';

/**
 * Middleware para validar si el usuario tiene el rol adecuado.
 * @param allowedRoles Lista de roles permitidos.
 */
export const validateRole = (allowedRoles: string[]) => {
  return async (req: ISessionRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({
          ok: false,
          status: 'error',
          message: 'Usuario no autenticado',
        });
        return;
      }

      if (!req.user) {
        res.status(404).json({
          ok: false,
          status: 'error',
          message: 'Usuario no encontrado',
        });
        return;
      }

      // Verificar si el rol del usuario está en la lista de roles permitidos
      if (!allowedRoles.includes(req.user.role.name)) {
        res.status(403).json({
          ok: false,
          status: 'error',
          message: 'No tienes permisos para acceder a esta ruta',
        });
        return;
      }

      next();
    } catch (error) {
      console.error('Error en la validación de roles:', error);
      res.status(500).json({
        ok: false,
        status: 'error',
        message: 'Error interno del servidor',
      });
      return;
    }
  };
};
