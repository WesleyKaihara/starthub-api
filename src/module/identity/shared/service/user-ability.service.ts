import { Injectable } from '@nestjs/common';

import { CreateUserAbilityDto } from '@identity/http/dto/userAbility/create-user-ability.dto';
import { UpdateUserAbilityDto } from '@identity/http/dto/userAbility/update-user-ability.dto';
import UserAbility from '@identity/core/entity/UserAbility';
import { UserAbilityRepositorySequelize } from '../persistence';

@Injectable()
export default class UserAbilityService {
  constructor(
    private readonly userAbilityRepository: UserAbilityRepositorySequelize,
  ) { }

  getUserAbilities(): Promise<UserAbility[]> {
    return this.userAbilityRepository.getAllUserAbilities();
  }

  async createUserAbility(
    createUserAbilityDto: CreateUserAbilityDto,
  ): Promise<UserAbility> {
    return this.userAbilityRepository.createUserAbility(createUserAbilityDto);
  }

  updateUserAbility(
    userAbilityId: number,
    updateUserAbilityDto: UpdateUserAbilityDto,
  ): Promise<UserAbility> {
    return this.userAbilityRepository.updateUserAbility(
      userAbilityId,
      updateUserAbilityDto,
    );
  }
}
