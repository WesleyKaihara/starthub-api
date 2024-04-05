import { Injectable } from '@nestjs/common';

import UserRole from '../entity/user-role.entity';
import UserRoleRepository from '../../shared/persistence/repository/user-role.repository';
import { CreateUserRoleDto } from '../../http/dto/userRole/create-user-role.dto';
import { UpdateUserRoleDto } from '../../http/dto/userRole/update-user-role.dto';

@Injectable()
export default class UserRoleService {
  constructor(private readonly userRoleRepository: UserRoleRepository) {}

  listUserRoles(): Promise<UserRole[]> {
    return this.userRoleRepository.findAll();
  }

  findUserRoleById(userRoleId: number): Promise<UserRole> {
    return this.userRoleRepository.findById(userRoleId);
  }

  async createUserRole(
    createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRole> {
    return this.userRoleRepository.create(createUserRoleDto);
  }

  updateUserRole(
    userRoleId: number,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRole> {
    return this.userRoleRepository.update(userRoleId, updateUserRoleDto);
  }
}
