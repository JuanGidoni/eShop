export interface AuthRepository {
  createUser(name: string, email: string, password: string): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  getUserById(id: string): Promise<any>;
}