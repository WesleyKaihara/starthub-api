import { Module } from '@nestjs/common';

import { UserController } from './http/user.controller';

import { UserRepositorySequelize } from './shared/persistence';
import UserService from './shared/service/user.service';

@Module({
  providers: [
    UserService,
    UserRepositorySequelize,
  ],
  controllers: [UserController,],
  exports: [UserService],
})
export class IdentityModule { }
