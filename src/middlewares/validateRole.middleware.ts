import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: { user_id: number; role: { name: string } };
}

/**
 * Middleware para validar si el usuario tiene el rol adecuado.
 * @param allowedRoles Lista de roles permitidos.
 */
export const validateRole = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({
          ok: false,
          status: 'error',
          message: 'Usuario no autenticado',
        });
        return;
      }

      // Obtener el usuario con su rol desde la base de datos
      const user = await prisma.user.findUnique({
        where: { user_id: req.user.user_id },
        include: { role: true },
      });

      if (!user) {
        res.status(404).json({
          ok: false,
          status: 'error',
          message: 'Usuario no encontrado',
        });
        return;
      }

      // Verificar si el rol del usuario está en la lista de roles permitidos
      if (!allowedRoles.includes(user.role.name)) {
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
