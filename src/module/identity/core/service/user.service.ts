import { Injectable } from '@nestjs/common';

import User from '../entity/user.entity';

import * as bcrypt from 'bcrypt';
import UserRepository from '../../shared/persistence/repository/user.repository';
import { CreateUserDto } from '../../http/dto/create-user.dto';
import AtualizarUserDto from '../../http/dto/update-user.dto';

@Injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  listUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findUserById(userId: number): Promise<User> {
    return this.userRepository.findById(userId);
  }

  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  findUserByCpf(cpf: string): Promise<User> {
    return this.userRepository.findByCpf(cpf);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    return this.userRepository.create(createUserDto);
  }

  updateUser(userId: number, updateUserDto: AtualizarUserDto): Promise<User> {
    return this.userRepository.update(userId, updateUserDto);
  }
}
