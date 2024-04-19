import { Module } from '@nestjs/common';

import { UserController } from './http/user.controller';

import { UserAbilityController } from './http/user-ability.controller';
import { UserAbilityRepositorySequelize, UserRepositorySequelize } from './shared/persistence';
import UserService from './shared/service/user.service';
import UserAbilityService from './shared/service/user-ability.service';

@Module({
  providers: [
    UserService,
    UserAbilityRepositorySequelize,
    UserRepositorySequelize,
    UserAbilityService,
  ],
  controllers: [UserController, UserAbilityController],
  exports: [UserService, UserAbilityService],
})
export class IdentityModule { }
