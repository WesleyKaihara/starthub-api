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
  CreateUserRoleDto,
  CreateUserRoleDtoSchema,
} from './dto/userRole/create-user-role.dto';
import {
  UpdateUserRoleDto,
  UpdateUserRoleDtoSchema,
} from './dto/userRole/update-user-role.dto';
import UserRoleService from '../core/service/user-role.service';

@Controller('/user-role')
@ApiTags('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get()
  async listaUserRoles(@Res() response: Response) {
    try {
      const roles = await this.userRoleService.listUserRoles();
      return response.json(roles);
    } catch (error) {
      return response.status(500).json({ mensagem: error.message });
    }
  }

  @Get('/:roleId')
  async findUserRoleById(
    @Param('roleId', new ParseIntPipe()) roleId: number,
    @Res() response: Response,
  ) {
    const userRole = await this.userRoleService.findUserRoleById(roleId);
    if (!userRole) {
      return response.status(404).send({
        mensagem: `Unable to find a user role with id ${roleId}.`,
      });
    }
    return response.json(userRole);
  }

  @Post()
  async createUserRole(
    @Body() createUserRoleDto: CreateUserRoleDto,
    @Res() response: Response,
  ) {
    try {
      const validSchema = CreateUserRoleDtoSchema.parse(
        createUserRoleDto,
      ) as CreateUserRoleDto;
      const newRole = await this.userRoleService.createUserRole(validSchema);
      return response.json(newRole);
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

  @Put('/:roleId')
  async updateUserRoleById(
    @Param('roleId', new ParseIntPipe()) roleId: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
    @Res() response: Response,
  ) {
    try {
      const validSchema = UpdateUserRoleDtoSchema.parse(
        updateUserRoleDto,
      ) as UpdateUserRoleDto;
      const updatedUserRole = await this.userRoleService.updateUserRole(
        roleId,
        validSchema,
      );
      return response.json(updatedUserRole);
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
