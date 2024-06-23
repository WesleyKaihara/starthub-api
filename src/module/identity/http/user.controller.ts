import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateUserBody, UpdateUserBody } from '@identity/core/useCase';
import UserService from '@identity/shared/service/user.service';
import {
  AuthGuard,
  AuthenticatedRequest,
} from '@src/module/auth/guard/auth.guard';

@Controller('/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async listUsers(@Res() response: Response) {
    try {
      const userList = await this.userService.listUsers();
      return response.json(userList);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async userDetails(
    @Req() request: AuthenticatedRequest,
    @Res() response: Response,
  ) {
    try {
      const userId = Number(request.user.sub);
      const user = await this.userService.findUserById(userId);
      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post()
  async createUser(@Body() input: CreateUserBody, @Res() response: Response) {
    try {
      const user = await this.userService.createUser(input);
      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post()
  async updatePassword(
    @Body() input: CreateUserBody,
    @Res() response: Response,
  ) {
    try {
      const user = await this.userService.createUser(input);
      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Put('/:userId')
  async updateUserById(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Body() input: UpdateUserBody,
    @Res() response: Response,
  ) {
    try {
      const user = await this.userService.updateUser(userId, input);
      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
