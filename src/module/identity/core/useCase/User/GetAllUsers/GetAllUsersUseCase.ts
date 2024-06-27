import { UserRepository } from '@identity/shared/persistence';
import { UserWithoutPassword } from './GetAllUser.dto';

export class GetAllUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserWithoutPassword[]> {
    const users = await this.userRepository.getAllUsers();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, cpf, ...user }) => ({
      ...user,
      cpf: cpf.getCpf(),
    })) as UserWithoutPassword[];
  }
}
