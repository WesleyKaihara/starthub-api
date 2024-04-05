import { Module } from '@nestjs/common';

import UserService from './core/service/user.service';
import UserRepository from './shared/persistence/repository/user.repository';
import { UserController } from './http/user.controller';

import UserRoleRepository from './shared/persistence/repository/user-role.repository';
import UserRoleService from './core/service/user-role.service';
import { UserRoleController } from './http/user-role.controller';

@Module({
  providers: [UserService, UserRepository, UserRoleService, UserRoleRepository],
  controllers: [UserController, UserRoleController],
  exports: [UserService, UserRoleService],
})
export class IdentityModule {}
