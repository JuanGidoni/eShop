import { AuthService } from '../AuthService';
import { InMemoryAuthRepository } from '../../infrastructure/adapters/InMemoryAuthRepository';
import { User } from '../../domain/entities/User';

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: InMemoryAuthRepository;

  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    authService = new AuthService(authRepository);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const result = await authService.register('John Doe', 'john@example.com', 'password123');
      expect(result.user).toBeDefined();
      expect(result.user.name).toBe('John Doe');
      expect(result.user.email).toBe('john@example.com');
      expect(result.user.password).toBeUndefined();
      expect(result.token).toBeDefined();
    });

    it('should throw an error if user already exists', async () => {
      await authService.register('John Doe', 'john@example.com', 'password123');
      await expect(authService.register('John Doe', 'john@example.com', 'password123')).rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    it('should login a user with correct credentials', async () => {
      await authService.register('John Doe', 'john@example.com', 'password123');
      const result = await authService.login('john@example.com', 'password123');
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe('john@example.com');
      expect(result.user.password).toBeUndefined();
      expect(result.token).toBeDefined();
    });

    it('should throw an error with incorrect credentials', async () => {
      await authService.register('John Doe', 'john@example.com', 'password123');
      await expect(authService.login('john@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
    });
  });

  describe('getUserData', () => {
    it('should return user data for a valid token', async () => {
      const { token } = await authService.register('John Doe', 'john@example.com', 'password123');
      const userData = await authService.getUserData(token);
      expect(userData).toBeDefined();
      expect(userData?.name).toBe('John Doe');
      expect(userData?.email).toBe('john@example.com');
      expect(userData?.password).toBeUndefined();
    });

    it('should return null for an invalid token', async () => {
      const userData = await authService.getUserData('invalid_token');
      expect(userData).toBeNull();
    });
  });
});