import { Injectable } from '@nestjs/common';

import UserRoleModel from '../model/user-role.model';

import UserRole from 'src/module/identity/core/entity/user-role.entity';
import { CreateUserRoleDto } from 'src/module/identity/http/dto/userRole/create-user-role.dto';
import { UpdateUserRoleDto } from 'src/module/identity/http/dto/userRole/update-user-role.dto';

@Injectable()
export default class UserRoleRepository {
  public findAll(): Promise<UserRole[]> {
    return UserRoleModel.findAll()
      .then((roles) => {
        return roles as UserRole[];
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  public async findById(id: number): Promise<UserRole> {
    return await UserRoleModel.findOne({
      where: { id },
    });
  }

  public create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    return UserRoleModel.create(createUserRoleDto as any)
      .then((newUserRole) => {
        return newUserRole as UserRole;
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  public async update(
    id: number,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRole> {
    const [rowsAffected] = await UserRoleModel.update(
      { ...updateUserRoleDto },
      { where: { id } },
    );

    if (rowsAffected > 0) {
      return await UserRoleModel.findByPk(id);
    } else {
      throw new Error(`Unable to find a user role with id ${id}`);
    }
  }
}
