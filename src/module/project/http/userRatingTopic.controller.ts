import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateUserRatingTopicBody } from '@project/core/useCase';
import UserRatingTopicService from '@project/shared/service/userRatingTopic.service';

@Controller('/user-rating-topic')
@ApiTags('UserRatingTopic')
export class UserRatingTopicController {
  constructor(
    private readonly userRatingTopicService: UserRatingTopicService,
  ) {}

  @Get()
  async listUserRatingTopics(@Res() response: Response) {
    try {
      const userRatingTopics =
        await this.userRatingTopicService.getAllUserRatingTopics();
      return response.json(userRatingTopics);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  @Post()
  async createUserRatingTopic(
    @Body() input: CreateUserRatingTopicBody,
    @Res() response: Response,
  ) {
    try {
      const ratingTopic =
        await this.userRatingTopicService.createUserRatingTopic(
          input,
        );
      return response.json(ratingTopic);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
