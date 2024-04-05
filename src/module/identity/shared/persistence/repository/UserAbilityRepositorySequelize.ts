import { Injectable } from '@nestjs/common';

import UserAbilityModel from '../model/UserAbilityModel';
import UserAbility from '@identity/core/entity/UserAbility';
import UserAbilityRepository from './UserAbilityRepository';

import { CreateUserAbilityDto } from '@identity/http/dto/userAbility/create-user-ability.dto';
import { UpdateUserAbilityDto } from '@identity/http/dto/userAbility/update-user-ability.dto';

@Injectable()
export default class UserAbilityRepositorySequelize implements UserAbilityRepository {
  public getAllUserAbilities(): Promise<UserAbility[]> {
    return UserAbilityModel.findAll()
      .then((abilities) => {
        return abilities as UserAbility[];
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  public createUserAbility(createUserAbilityDto: CreateUserAbilityDto): Promise<UserAbility> {
    return UserAbilityModel.create(createUserAbilityDto as any)
      .then((newUserAbility) => {
        return newUserAbility as UserAbility;
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  public async updateUserAbility(
    id: number,
    updateUserAbilityDto: UpdateUserAbilityDto,
  ): Promise<UserAbility> {
    const [rowsAffected] = await UserAbilityModel.update(
      { ...updateUserAbilityDto },
      { where: { id } },
    );

    if (rowsAffected > 0) {
      return await UserAbilityModel.findByPk(id);
    } else {
      throw new Error(`Unable to find a user ability with id ${id}`);
    }
  }
}
