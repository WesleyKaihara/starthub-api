import User from '@identity/core/entity/User';
import { CreateUserBody } from './CreateUser.dto';
import { UserRepository } from '@identity/shared/persistence';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserBody): Promise<User> {
    const user = User.create(
      input.name,
      input.cpf,
      input.email,
      input.password,
    );

    await this.userRepository.createUser({
      name: user.name,
      cpf: user.cpf.format(),
      email: user.email,
      password: user.password,
    });

    return user;
  }
}
