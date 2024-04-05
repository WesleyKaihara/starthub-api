import UserAbility from '@identity/core/entity/UserAbility';

import { CreateUserAbilityDto } from '@identity/http/dto/userAbility/create-user-ability.dto';
import { UpdateUserAbilityDto } from '@identity/http/dto/userAbility/update-user-ability.dto';

export default interface UserAbilityRepository {
  getAllUserAbilities(): Promise<UserAbility[]>;
  createUserAbility(createUserAbilityDto: CreateUserAbilityDto): Promise<UserAbility>;
  updateUserAbility(
    id: number,
    updateUserAbilityDto: UpdateUserAbilityDto,
  ): Promise<UserAbility>;
}
