import { PrismaClient, User } from '@prisma/client';
import { IUser } from './user.interface';

const prisma = new PrismaClient();

export class UserService {
  constructor() {}

  public getAllUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany({});
    return users;
  };

  public getUsers = async (skip: number, take: number): Promise<User[]> => {
    const users = await prisma.user.findMany({
      skip,
      take,
    });
    return users;
  };

  public getOneUser = async (userId: number): Promise<User | null> => {
    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    return user;
  };

  public getCountUsers = async (): Promise<number> => {
    const count = prisma.user.count();
    return count;
  };

  public createUser = async (userData: IUser): Promise<User> => {
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  };

  public updateUser = async (
    userId: number,
    userData: IUser
  ): Promise<User | null> => {
    const user = await prisma.user.update({
      where: {
        user_id: userId,
      },

      data: userData,
    });
    return user;
  };

  public deleteUser = async (userId: number): Promise<User> => {
    const user = await prisma.user.delete({
      where: {
        user_id: userId,
      },
    });
    return user;
  };
}
