import jwt from 'jsonwebtoken';

export class JwtUtil {
  private static readonly JWT_SECRET: string = process.env.JWT_SECRET || '';
  private static readonly JWT_EXPIRES_IN = '168h'; // 7 días

  /**
   * Genera un token JWT de forma asincrónica.
   * @param payload - La información que se incluirá en el token.
   * @returns Una promesa que resuelve el token JWT generado.
   */
  public static async generateToken(payload: object): Promise<string> {
    if (!this.JWT_SECRET) {
      throw new Error(
        'JWT_SECRET no está definido en las variables de entorno.'
      );
    }

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        this.JWT_SECRET,
        { expiresIn: this.JWT_EXPIRES_IN },
        (err, token) => {
          if (err || !token) {
            reject(new Error('Error generando el token'));
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  /**
   * Verifica un token JWT de forma asincrónica.
   * @param token - El token JWT a verificar.
   * @returns Una promesa que resuelve el payload decodificado si el token es válido.
   */
  public static async verifyToken(token: string): Promise<any> {
    if (!this.JWT_SECRET) {
      throw new Error(
        'JWT_SECRET no está definido en las variables de entorno.'
      );
    }

    return new Promise((resolve, reject) => {
      jwt.verify(token, this.JWT_SECRET as string, (err, decoded) => {
        if (err || !decoded) {
          reject(new Error('Token inválido o expirado.'));
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
