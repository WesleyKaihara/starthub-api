import User from '@identity/core/entity/User';
import { UpdateUserBody, CreateUserBody} from '@identity/core/useCase';

export interface UserRepository {
  getAllUsers(): Promise<User[]>;
  findUserById(id: number): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  createUser(input: CreateUserBody): Promise<User>;
  updateUser(
    id: number,
    input: UpdateUserBody,
  ): Promise<User>;
}
