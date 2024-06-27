import User from '@identity/core/entity/User';
import { UserRepository } from '@identity/shared/persistence';
import { UpdatePasswordBody } from './UpdatePassword.dto';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number, input: UpdatePasswordBody): Promise<User> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new Error('');
    }

    user.password = input.newPassword;
    await this.userRepository.updateUser(userId, {
      name: user.name,
      cpf: user.cpf.format(),
    });
    return user;
  }
}
