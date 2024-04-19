import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import User from '@identity/core/entity/User';
import UserModel from '../../model/user.model';
import { CreateUserBody, UpdateUserBody } from '@identity/core/useCase';

@Injectable()
export class UserRepositorySequelize implements UserRepository {
  async getAllUsers(): Promise<User[]> {
    const users = await UserModel.findAll();

    return users.map((user) =>
      User.restore(
        user.id,
        user.name,
        user.email,
        user.password
      ),
    );
  }

  public async findUserById(id: number): Promise<User> {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return User.restore(
      user.id,
      user.name,
      user.email,
      user.password
    );
  }

  public async findUserByEmail(email: string): Promise<User> {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return User.restore(
      user.id,
      user.name,
      user.email,
      user.password
    );
  }

  async createUser(input: CreateUserBody): Promise<User> {
    const user: UserModel = await UserModel.create({
      name: input.name,
      email: input.email,
      password: input.password,
    });

    return User.restore(
      user.id,
      user.name,
      user.email,
      user.password
    );
  }

  public async updateUser(
    id: number,
    input: UpdateUserBody,
  ): Promise<User> {
    const [rowsAffected] = await UserModel.update(
      { ...input },
      { where: { id } },
    );

    if (rowsAffected > 0) {
      const user = await UserModel.findByPk(id);
      if (!user) {
        throw new Error(`User with id ${id} not found after update`);
      }
      return User.restore(
        user.id,
        user.name,
        user.email,
        user.password
      );
    } else {
      throw new Error(`Unable to update user with id ${id}`);
    }
  }
}
