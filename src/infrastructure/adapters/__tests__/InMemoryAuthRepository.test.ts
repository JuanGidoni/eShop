import { InMemoryAuthRepository } from '../InMemoryAuthRepository';

describe('InMemoryAuthRepository', () => {
  let repository: InMemoryAuthRepository;

  beforeEach(() => {
    repository = new InMemoryAuthRepository();
  });

  it('should create a new user', async () => {
    const user = await repository.createUser('John Doe', 'john@example.com', 'password123');
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.password).toBeUndefined();
  });

  it('should get a user by email', async () => {
    await repository.createUser('John Doe', 'john@example.com', 'password123');
    const user = await repository.getUserByEmail('john@example.com');
    expect(user).toBeDefined();
    expect(user?.name).toBe('John Doe');
    expect(user?.email).toBe('john@example.com');
    expect(user?.password).toBe('password123');
  });

  it('should return null when getting a non-existent user by email', async () => {
    const user = await repository.getUserByEmail('nonexistent@example.com');
    expect(user).toBeNull();
  });

  it('should get a user by id', async () => {
    const createdUser = await repository.createUser('John Doe', 'john@example.com', 'password123');
    const user = await repository.getUserById(createdUser.id);
    expect(user).toBeDefined();
    expect(user?.name).toBe('John Doe');
    expect(user?.email).toBe('john@example.com');
    expect(user?.password).toBe('password123');
  });

  it('should return null when getting a non-existent user by id', async () => {
    const user = await repository.getUserById('nonexistent-id');
    expect(user).toBeNull();
  });
});