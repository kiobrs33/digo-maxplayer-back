import { Response, NextFunction } from 'express';
import { JwtUtil } from '../util/jwt.util';
import { PrismaClient } from '@prisma/client';
import { IJwtPayload, ISessionRequest } from '../interfaces/session.interfaces';

const prisma = new PrismaClient();

export const validateToken = async (
  req: ISessionRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        ok: false,
        status: 'error',
        message: 'No tienes autorización para esta URL.',
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    const valueToken = (await JwtUtil.verifyToken(token)) as IJwtPayload;

    if (!valueToken?.user_id) {
      res.status(401).json({
        ok: false,
        status: 'error',
        message: 'Token inválido o expirado.',
      });
      return;
    }

    // Obtener usuario junto con el rol desde Prisma
    const user = await prisma.user.findUnique({
      where: { user_id: Number(valueToken.user_id) },
      include: { role: true }, // Esto asegura que traemos el rol del usuario
    });

    if (!user) {
      res.status(401).json({
        ok: false,
        status: 'error',
        message: 'Usuario no encontrado.',
      });
      return;
    }

    // Guardar solo la información relevante en req.user
    req.user = {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      role: {
        name: user.role.name, // Esto permite que validateRole pueda verificarlo
      },
    };

    next();
  } catch (error: unknown) {
    next(error);
  }
};
