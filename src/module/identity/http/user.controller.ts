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

import { CreateUserDto, CreateUserDtoSchema } from './dto/create-user.dto';

import { ZodError } from 'zod';
import UserService from '../core/service/user.service';
import AtualizarUserDto, { UpdateUserDtoSchema } from './dto/update-user.dto';

@Controller('/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async listUsers(@Res() response: Response) {
    try {
      const userList = await this.userService.listUsers();
      return response.json(userList);
    } catch (error) {
      return response.status(500).json({ mensagem: error.message });
    }
  }

  @Get('/:userId')
  async findUserById(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Res() response: Response,
  ) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      return response.status(404).send({
        mensagem: `Unable to find a user with id ${userId}.`,
      });
    }
    return response.json(user);
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const validSchema = CreateUserDtoSchema.parse(
        createUserDto,
      ) as CreateUserDto;
      const newUser = await this.userService.createUser(validSchema);
      return response.json(newUser);
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

  @Put('/:userId')
  async updateUserById(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Body() updateUserDto: AtualizarUserDto,
    @Res() response: Response,
  ) {
    try {
      const validSchema = UpdateUserDtoSchema.parse(
        updateUserDto,
      ) as AtualizarUserDto;
      const updatedUser = await this.userService.updateUser(
        userId,
        validSchema,
      );
      return response.json(updatedUser);
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
