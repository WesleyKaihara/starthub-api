import { UserWithoutPassword } from './../GetAllUsers/GetAllUser.dto';
import { UserRepository } from '@identity/shared/persistence';

export class FindUserById {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number): Promise<UserWithoutPassword> {
    const user = await this.userRepository.findUserById(userId);

    const userWithoutPassword: UserWithoutPassword = {
      id: user.id,
      name: user.name,
      cpf: user.cpf.format(),
      email: user.email,
    };
    return userWithoutPassword;
  }
}
