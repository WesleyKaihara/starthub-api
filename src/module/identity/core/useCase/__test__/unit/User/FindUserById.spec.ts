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
      .withName('user 1')
      .withEmail('user1@email.com')
      .withCpf('422.209.770-56')
      .withPassword('SeCRet123%')
      .build();

    await userRepository.createUser({
      name: expectedUser.name,
      cpf: expectedUser.cpf.getCpf(),
      email: expectedUser.email,
      password: expectedUser.password,
    });

    const user = await findUserById.execute(userId);

    expect(user.id).toEqual(userId);
    expect(user.name).toEqual('user 01');
  });

  it('should throw and expection if user is not found', async () => {
    const userId = 2;

    expect(findUserById.execute(userId)).rejects.toThrow(
      `User with id ${userId} not found`,
    );
  });
});
