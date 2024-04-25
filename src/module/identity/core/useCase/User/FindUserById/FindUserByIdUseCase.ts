import User from '@identity/core/entity/User';
import { UserRepository } from '@identity/shared/persistence';

export class FindUserById {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number): Promise<User> {
    const user = await this.userRepository.findUserById(userId);
    return user;
  }
}
