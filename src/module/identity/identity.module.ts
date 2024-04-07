import { Module } from '@nestjs/common';
import UserAbilityRepositorySequelize from './shared/persistence/repository/UserAbilityRepositorySequelize';

import UserService from './core/service/user.service';
import { UserController } from './http/user.controller';

import UserAbilityService from './core/service/user-ability.service';
import { UserAbilityController } from './http/user-ability.controller';
import UserRepository from './shared/persistence/repository/user.repository';

@Module({
  providers: [
    UserService,
    UserRepository,
    UserAbilityRepositorySequelize,
    UserAbilityService,
  ],
  controllers: [UserController, UserAbilityController],
  exports: [UserService, UserAbilityService],
})
export class IdentityModule {}
