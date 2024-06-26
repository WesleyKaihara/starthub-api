import User from '@identity/core/entity/User';
import { UpdateUserBody } from './UpdateUser.dto';
import { UserRepository } from '@identity/shared/persistence';

export class UpdateUser {
  constructor(private readonly productRepository: UserRepository) {}

  async execute(userId: number, input: UpdateUserBody): Promise<User> {
    const user = User.update(userId, input.cpf, input.name);

    await this.productRepository.updateUser(userId, {
      name: user.name,
      cpf: user.cpf.format(),
    });

    return user;
  }
}
