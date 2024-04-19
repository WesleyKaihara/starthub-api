import User from '@identity/core/entity/User';
import { GetAllUsers } from '@identity/core/useCase/User/GetAllUsers/GetAllUsersUseCase';
import { UserRepository, UserRepositoryInMemory } from '@identity/shared/persistence';

describe('GetAllUsers', () => {
  let getAllUsers: GetAllUsers;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    getAllUsers = new GetAllUsers(userRepository);
  });

  it('should get all users', async () => {
    const user1 = User.create('User 1', 'user01@email.com', "SEcret123%");
    const user2 = User.create('User 2', 'user02@email.com', '123Secret#');
    await userRepository.createUser(user1);
    await userRepository.createUser(user2);

    const users = await getAllUsers.execute();

    expect(users).toHaveLength(2);
    expect(users[0].name).toBe('User 1');
    expect(users[0].email).toBe('user01@email.com');

    expect(users[1].name).toBe('User 2');
    expect(users[1].email).toBe('user02@email.com');
  });
});
