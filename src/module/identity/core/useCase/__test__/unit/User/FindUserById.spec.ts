import { FindUserById } from '@identity/core/useCase/User/FindUserById/FindUserByIdUseCase';
import {
  UserRepository,
  UserRepositoryInMemory,
} from '@identity/shared/persistence';
import UserBuilder from '../../UserBuilder';

describe('FindUserById', () => {
  let findUserById: FindUserById;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    findUserById = new FindUserById(userRepository);
  });

  it('should find user by id', async () => {
    const userId = 1;
    const expectedUser = new UserBuilder()
      .withName('User 1')
      .withEmail('user@email.com')
      .withPassword('SeCRet123%')
      .build();
    await userRepository.createUser(expectedUser);

    const user = await findUserById.execute(userId);

    expect(user).toEqual(expectedUser);
  });

  it('should throw and expection if user is not found', async () => {
    const userId = 2;

    expect(findUserById.execute(userId)).rejects.toThrow(
      `User with id ${userId} not found`,
    );
  });
});
