import User from '@identity/core/entity/User';
import { CreateUserBody } from './CreateUser.dto';
import { UserRepository } from '@identity/shared/persistence';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserBody): Promise<User> {
    const user = User.create(input.name, input.email, input.password);
    await this.userRepository.createUser(user);
    return user;
  }
}
