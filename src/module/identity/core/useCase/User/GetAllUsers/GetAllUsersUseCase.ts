import { UserRepository } from '@identity/shared/persistence';
import User from '../../../entity/User';

export class GetAllUsers {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}
