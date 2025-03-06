import { NextFunction, Request, Response } from 'express';
import { PaginatorUtil } from '../util/paginator.util';
import { BcryptUtil } from '../util/bcrypt.util';
import { UserService } from './user.service';
import { IUser, IUserParams, IUserQueries } from './user.interface';

export class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  public getUsers = async (
    req: Request<{}, {}, {}, IUserQueries>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { take, page } = req.query;
      const totalItems = await this._userService.getCountUsers();

      if (take || page) {
        const paginator = PaginatorUtil.getPagination(
          Number(page),
          Number(take),
          totalItems
        );
        const { currentPage, itemsPerPage, offset, totalPages } = paginator;
        const users = await this._userService.getUsers(offset, itemsPerPage);

        res.status(200).json({
          ok: true,
          status: 'success',
          message: 'Lista de usuarios.',
          data: {
            pagination: {
              total_items: totalItems,
              total_pages: totalPages,
              currrent_page: currentPage,
              item_per_page: itemsPerPage,
            },
            items: users,
          },
        });
        return;
      }

      const users = await this._userService.getAllUsers();

      res.status(200).json({
        ok: true,
        status: 'success',
        message: 'Lista de usuarios.',
        data: {
          total_items: totalItems,
          items: users,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public getOneUser = async (
    req: Request<IUserParams, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const user = await this._userService.getOneUser(Number(id));

      if (!user) {
        res.status(404).json({
          ok: false,
          status: 'error',
          message: 'Usuario no encontrado.',
        });
        return;
      }

      res.status(200).json({
        ok: true,
        status: 'success',
        message: 'Usuario encontrado.',
        data: {
          user,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public createUser = async (
    req: Request<{}, {}, IUser, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body;

      // Encriptando la contraseña
      const hashPassword = await BcryptUtil.hashPassword(body.password);
      body.password = hashPassword;

      const user = await this._userService.createUser(body);

      res.status(200).json({
        ok: true,
        status: 'success',
        message: 'Usuario creado.',
        data: {
          user,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request<IUserParams, {}, IUser, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const body = req.body;

      if (body.password) {
        // Encriptando la contraseña
        const hashPassword = await BcryptUtil.hashPassword(body.password);
        body.password = hashPassword;
      }

      const user = await this._userService.updateUser(Number(id), body);

      if (!user) {
        res.status(404).json({
          ok: false,
          status: 'error',
          message: 'Usuario no encontrado.',
        });
        return;
      }

      res.status(200).json({
        ok: true,
        status: 'success',
        message: 'Usuario actualizado.',
        data: {
          user,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request<IUserParams, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const user = await this._userService.deleteUser(Number(id));

      if (!user) {
        res.status(404).json({
          ok: false,
          status: 'error',
          message: 'Usuario no encontrado.',
        });
        return;
      }

      res.status(200).json({
        ok: true,
        status: 'success',
        message: 'Usuario eliminado.',
        data: {
          user,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };
}
