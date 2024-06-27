import User from '@identity/core/entity/User';
import { GetAllUsers } from '@identity/core/useCase/User/GetAllUsers/GetAllUsersUseCase';
import {
  UserRepository,
  UserRepositoryInMemory,
} from '@identity/shared/persistence';

describe('GetAllUsers', () => {
  let getAllUsers: GetAllUsers;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    getAllUsers = new GetAllUsers(userRepository);
  });

  it('should get all users', async () => {
    const user1 = User.create(
      'User 1',
      '183.544.680-97',
      'user01@email.com',
      'SEcret123%',
    );
    const user2 = User.create(
      'User 2',
      '183.544.680-97',
      'user02@email.com',
      '123Secret#',
    );
    await userRepository.createUser({
      name: user1.name,
      cpf: user1.cpf.getCpf(),
      email: user1.email,
      password: user1.password,
    });
    await userRepository.createUser({
      name: user2.name,
      cpf: user2.cpf.getCpf(),
      email: user2.email,
      password: user2.password,
    });

    const users = await getAllUsers.execute();

    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
    expect(users[0]).toHaveProperty('cpf');
  });
});
