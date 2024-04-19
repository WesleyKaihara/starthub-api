import User from '@identity/core/entity/User';
import { CreateUser, CreateUserBody, UpdateUser, UpdateUserBody } from '@identity/core/useCase';
import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { UserRepositorySequelize } from '../persistence';

@Injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepositorySequelize) { }

  listUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  findUserById(userId: number): Promise<User> {
    return this.userRepository.findUserById(userId);
  }

  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUserByEmail(email);
  }

  async createUser(input: CreateUserBody): Promise<User> {
    input.password = await bcrypt.hash(input.password, 12);
    const createUser = new CreateUser(this.userRepository);
    return createUser.execute(input);
  }

  updateUser(
    userId: number,
    input: UpdateUserBody,
  ): Promise<User> {
    const updateUser = new UpdateUser(this.userRepository);
    return updateUser.execute(userId, input);
  }
}
