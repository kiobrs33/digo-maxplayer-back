import { PrismaClient, User } from '@prisma/client';
import { IUserRegister } from './auth.interface';

const prisma = new PrismaClient();

export class AuthService {
  constructor() {}

  public async createUser(userData: IUserRegister): Promise<User> {
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  }

  public verifyEmailUser = async (userEmail: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    return user;
  };

  public countEmailOccurrences = async (userEmail: string): Promise<number> => {
    const count = await prisma.user.count({
      where: {
        email: userEmail,
      },
    });
    return count;
  };
}
