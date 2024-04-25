import User from '@identity/core/entity/User';
import { UpdateUserBody } from './UpdateUser.dto';
import { UserRepository } from '@identity/shared/persistence';

export class UpdateUser {
  constructor(private readonly productRepository: UserRepository) {}

  async execute(userId: number, input: UpdateUserBody): Promise<User> {
    const user = User.update(userId, input.name, input.email, input.password);
    await this.productRepository.updateUser(userId, user);
    return user;
  }
}
