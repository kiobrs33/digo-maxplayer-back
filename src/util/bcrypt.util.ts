import bcrypt from 'bcrypt';

export class BcryptUtil {
  // Esta variable no puede cambiarse y pertenece a la clase, no a una instancia
  private static readonly saltRounds = 10;

  /**
   * Hashea una contraseña.
   * @param password - La contraseña en texto plano.
   * @returns Una promesa que resuelve con el hash de la contraseña.
   */
  static async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      console.error('BcryptUtil', error);
      throw new Error('Error hashing password');
    }
  }

  /**
   * Compara una contraseña en texto plano con un hash.
   * @param password - La contraseña en texto plano.
   * @param hashedPassword - El hash de la contraseña.
   * @returns Una promesa que resuelve con un booleano indicando si coinciden.
   */
  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error('BcryptUtil', error);
      throw new Error('Error comparing passwords');
    }
  }
}
