import User from '@identity/core/entity/User';
import { UserRepository } from './user.repository';
import { UpdateUserBody, CreateUserBody } from '@identity/core/useCase';

export class UserRepositoryInMemory implements UserRepository {
  private users: User[];
  private nextId: number;

  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async findUserById(userId: number): Promise<User | null> {
    return this.users.find((user) => user.id === userId) || null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }
  
  async createUser(input: CreateUserBody): Promise<User> {
    const user = User.create(
      input.name,
      input.email,
      input.password
    );
    user.id = this.nextId++;
    this.users.push(user);
    return user;
  }

  async updateUser(
    userId: number,
    input: UpdateUserBody,
  ): Promise<User | null> {
    const userIndex = this.users.findIndex(
      (user) => user.id === userId,
    );
    if (userIndex !== -1) {
      const updatedUser = User.restore(
        userId,
        input.name,
        input.email,
        input.password
      );
      updatedUser.id = userId;
      this.users[userIndex] = updatedUser;
      return updatedUser;
    }
    return null;
  }
}
