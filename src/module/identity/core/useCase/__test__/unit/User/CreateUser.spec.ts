import { CreateUserBody } from '@identity/core/useCase/User/CreateUser/CreateUser.dto';
import { CreateUser } from '@identity/core/useCase/User/CreateUser/CreateUserUseCase';
import {
  UserRepository,
  UserRepositoryInMemory,
} from '@identity/shared/persistence';

describe('CreateUser', () => {
  let createUser: CreateUser;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    createUser = new CreateUser(userRepository);
  });

  it('should create a user', async () => {
    const input: CreateUserBody = {
      name: 'Test User',
      cpf: '183.544.680-97',
      email: 'user@email.com',
      password: 'SecRet125#',
    };

    const user = await createUser.execute(input);

    expect(user).toBeDefined();
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('user@email.com');
    expect(user.password).toBe('SecRet125#');
  });

  it('should throw error if user name is too short', async () => {
    const input: CreateUserBody = {
      name: 'AA',
      cpf: '183.544.680-97',
      email: 'user@email.com',
      password: 'SecRet125#',
    };

    await expect(createUser.execute(input)).rejects.toThrow(
      /User Name must have at least 3 characters/,
    );
  });
});
