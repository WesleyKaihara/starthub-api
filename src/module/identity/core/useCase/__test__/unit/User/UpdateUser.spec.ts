import { UpdateUser } from '@identity/core/useCase/User/UpdateUser/UpdateUserUseCase';
import { UserRepository, UserRepositoryInMemory } from '@identity/shared/persistence';
import UserBuilder from '../../UserBuilder';

describe('UpdateUser', () => {
  let updateUser: UpdateUser;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    updateUser = new UpdateUser(userRepository);
  });

  it('should update a user', async () => {
    const userId = 1;
    const user = new UserBuilder()
      .withName('Updated User Name')
      .withEmail('user@email.com')
      .withPassword('SeCret123$')
      .build();
    await userRepository.createUser(user);

    const updateUserDto = new UserBuilder()
      .withName('Updated User Name')
      .withEmail('user@email.com')
      .withPassword('SeCret123$')
      .build();

    const updatedUser = await updateUser.execute(
      userId,
      updateUserDto,
    );

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe('Updated User Name');
    expect(updatedUser.email).toBe('user@email.com');
  });

  it('should throw error if user name is too short', async () => {
    const userId = 1;
    const updateUserDto = new UserBuilder()
      .withName('AA')
      .withEmail('user@email.com')
      .withPassword('SeCret123$')
      .build();

    await expect(
      updateUser.execute(userId, updateUserDto),
    ).rejects.toThrow(/User Name must have at least 3 characters/);
  });
});
