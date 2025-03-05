import { Request, Response, NextFunction } from 'express';
import { IUserLogin, IUserRegister } from './auth.interface';
import { BcryptUtil } from '../util/bcrypt.util';
import { JwtUtil } from '../util/jwt.util';
import { AuthService } from './auth.service';

export class AuthController {
  private _authService: AuthService;

  constructor() {
    this._authService = new AuthService();
  }

  // TODO: Request<ParamsDictionary, ResBody, ReqBody, ReqQuery>
  public postLogin = async (
    req: Request<{}, {}, IUserLogin, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { password, email } = req.body;
      const user = await this._authService.verifyEmailUser(email);

      // Verificando si el correo electronico existe
      if (!user) {
        res.status(400).json({
          ok: false,
          status: 'error',
          message: 'El correo electronico es incorrecto.',
        });
        return;
      }

      // Verificando la contraseña
      const validPassword = await BcryptUtil.comparePassword(
        password,
        user.password
      );

      if (!validPassword) {
        res.status(400).json({
          ok: false,
          status: 'error',
          message: 'La contraseña es incorrecta.',
        });
        return;
      }

      // Generando el token con JWT
      const userId = String(user.user_id);
      const token = await JwtUtil.generateToken({ userId });

      res.status(200).json({
        ok: true,
        status: 'success',
        message: 'Sesión iniciada token generado.',
        data: {
          token,
          user,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  // TODO: Request<ParamsDictionary, ResBody, ReqBody, ReqQuery>
  public postRegister = async (
    req: Request<{}, {}, IUserRegister, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body;

      body.role_id = 2;
      body.balance = 0;

      // Encriptando la contraseña
      const hashPassword = await BcryptUtil.hashPassword(body.password);
      body.password = hashPassword;

      // Creando el usuario
      const user = await this._authService.createUser(body);

      // Generando el token con JWT
      const userId = String(user.user_id);
      const token = await JwtUtil.generateToken({ userId });

      res.status(200).json({
        ok: true,
        status: 'success',
        message: 'Usuario registrado.',
        data: {
          token,
          user,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };
}
