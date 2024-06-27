import User from '@identity/core/entity/User';
import { UserRepository } from './user.repository';
import { UpdateUserBody, CreateUserBody } from '@identity/core/useCase';

export class UserRepositoryInMemory implements UserRepository {
  private users: User[];
  private nextId: number;

  constructor() {
    this.users = [User.restore(1, 'user 01', 'user01@email.com')];
    this.nextId = 1;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async findUserById(userId: number): Promise<User> {
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return user;
  }

  async createUser(input: CreateUserBody): Promise<User> {
    const user = User.create(
      input.name,
      input.cpf,
      input.email,
      input.password,
    );
    user.id = this.nextId++;
    this.users.push(user);
    return user;
  }

  async updateUser(
    userId: number,
    input: UpdateUserBody,
  ): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      const updatedUser = User.restore(userId, input.name, input.cpf);
      updatedUser.id = userId;
      this.users[userIndex] = updatedUser;
      return updatedUser;
    }
    return null;
  }
}
