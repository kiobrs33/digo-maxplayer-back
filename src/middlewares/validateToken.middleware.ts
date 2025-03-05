import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from '../util/jwt.util';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SessionRequest extends Request {
  user?: { user_id: number; role: { name: string } };
}

export const validateToken = async (
  req: SessionRequest,
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
    const valueToken = await JwtUtil.verifyToken(token);

    if (!valueToken?.userId) {
      res.status(401).json({
        ok: false,
        status: 'error',
        message: 'Token inválido o expirado.',
      });
      return;
    }

    // Obtener usuario junto con el rol desde Prisma
    const user = await prisma.user.findUnique({
      where: { user_id: Number(valueToken.userId) },
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

    console.log('USER => ', user);

    // Guardar solo la información relevante en req.user
    req.user = {
      user_id: user.user_id,
      role: {
        name: user.role.name, // Esto permite que validateRole pueda verificarlo
      },
    };

    next();
  } catch (error: unknown) {
    next(error);
  }
};
