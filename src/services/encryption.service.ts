import * as argon2 from 'argon2';

export class EncryptionService {
  async createHash(password: string): Promise<string> {
    try {
      return await argon2.hash(password);
    } catch (error) {
      throw new Error(`Password hashing error, ${error}`);
    }
  }

  async verifyPassword(hash: string, password: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch (error) {
      throw new Error(`Password verification error, ${error}`);
    }
  }
}
