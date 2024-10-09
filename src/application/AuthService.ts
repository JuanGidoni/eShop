import { User } from '../domain/entities/User';
import { AuthRepository } from '../domain/ports/AuthRepository';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  private generateToken(user: User): string {
    return btoa(JSON.stringify({ id: user.id, email: user.email }));
  }

  private decodeToken(token: string): { id: string; email: string } | null {
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  }

  async register(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
    const existingUser = await this.authRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = await this.authRepository.createUser(name, email, password);
    const { password: _, ...userWithoutPassword } = newUser;
    const token = this.generateToken(userWithoutPassword);
    return { user: userWithoutPassword, token };
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.authRepository.getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = this.generateToken(userWithoutPassword);
    return { user: userWithoutPassword, token };
  }

  async getUserData(token: string): Promise<User | null> {
    const decoded = this.decodeToken(token);
    if (!decoded) {
      return null;
    }

    const user = await this.authRepository.getUserById(decoded.id);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}