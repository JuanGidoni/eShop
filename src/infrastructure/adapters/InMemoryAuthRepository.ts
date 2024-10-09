import { AuthRepository } from '../../domain/ports/AuthRepository';
import { User } from '../../domain/entities/User';

export class InMemoryAuthRepository implements AuthRepository {
  private users: User[] = [];
  private nextId = 1;

  async createUser(name: string, email: string, password: string): Promise<User> {
    const newUser: User = { id: this.nextId.toString(), name, email, password };
    this.users.push(newUser);
    this.nextId++;
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }
}