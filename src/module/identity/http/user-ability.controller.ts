import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ZodError } from 'zod';

import {
  CreateUserAbilityDto,
  CreateUserAbilityDtoSchema,
} from './dto/userAbility/create-user-ability.dto';
import {
  UpdateUserAbilityDto,
  UpdateUserAbilityDtoSchema,
} from './dto/userAbility/update-user-ability.dto';
import UserAbilityService from '@identity/shared/service/user-ability.service';

@Controller('/user-ability')
@ApiTags('UserAbility')
export class UserAbilityController {
  constructor(private readonly userAbilityService: UserAbilityService) { }

  @Get()
  async getUserAbilities(@Res() response: Response) {
    try {
      const abilities = await this.userAbilityService.getUserAbilities();
      return response.json(abilities);
    } catch (error) {
      return response.status(500).json({ mensagem: error.message });
    }
  }

  @Post()
  async createUserAbility(
    @Body() createUserAbilityDto: CreateUserAbilityDto,
    @Res() response: Response,
  ) {
    try {
      const validSchema = CreateUserAbilityDtoSchema.parse(
        createUserAbilityDto,
      ) as CreateUserAbilityDto;
      const ability =
        await this.userAbilityService.createUserAbility(validSchema);
      return response.json(ability);
    } catch (error) {
      if (error instanceof ZodError) {
        return response
          .status(400)
          .json({ mensagem: 'Invalid Schema', errors: error.errors });
      } else {
        return response.status(500).json({ mensagem: error.message });
      }
    }
  }

  @Put('/:abilityId')
  async updateUserAbilityById(
    @Param('abilityId', new ParseIntPipe()) abilityId: number,
    @Body() updateUserAbilityDto: UpdateUserAbilityDto,
    @Res() response: Response,
  ) {
    try {
      const validSchema = UpdateUserAbilityDtoSchema.parse(
        updateUserAbilityDto,
      ) as UpdateUserAbilityDto;
      const updatedUserAbility =
        await this.userAbilityService.updateUserAbility(abilityId, validSchema);
      return response.json(updatedUserAbility);
    } catch (error) {
      if (error instanceof ZodError) {
        return response
          .status(400)
          .json({ mensagem: 'Invalid Schema', errors: error.errors });
      } else {
        return response.status(500).json({ mensagem: error.message });
      }
    }
  }
}
