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
import ProjectRatingTopicService from '@project/shared/service/ratingTopic.service';
import { CreateRatingTopicBody } from '@project/core/useCase/RatingTopic/CreateRatingTopicUseCase/CreateRatingTopic.dto';
import { UpdateRatingTopicBody } from '@project/core/useCase/RatingTopic/UpdateRatingTopicUseCase/UpdateRatingTopic.dto';

@Controller('/rating-topic')
@ApiTags('RatingTopic')
export class RatingTopicController {
  constructor(private readonly ratingTopicService: ProjectRatingTopicService) {}

  @Get()
  async listRatingTopics(@Res() response: Response) {
    try {
      const ratingTopics = await this.ratingTopicService.getAllRatingTopics();
      return response.json(ratingTopics);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  @Get('/:topicId')
  async findRatingTopicById(
    @Param('topicId', new ParseIntPipe()) topicId: number,
    @Res() response: Response,
  ) {
    try {
      const ratingTopic =
        await this.ratingTopicService.findRatingTopicById(topicId);

      return response.json(ratingTopic);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post()
  async createRatingTopic(
    @Body() input: CreateRatingTopicBody,
    @Res() response: Response,
  ) {
    try {
      const ratingTopic =
        await this.ratingTopicService.createRatingTopic(input);
      return response.json(ratingTopic);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Put('/:topicId')
  async updateRatingTopicById(
    @Param('topicId', new ParseIntPipe()) topicId: number,
    @Body() updateRatingTopicBody: UpdateRatingTopicBody,
    @Res() response: Response,
  ) {
    try {
      const ratingTopic = await this.ratingTopicService.updateRatingTopic(
        topicId,
        updateRatingTopicBody,
      );
      return response.json(ratingTopic);
    } catch (error) {
      if (error instanceof ZodError) {
        return response
          .status(400)
          .json({ message: 'Invalid Schema', errors: error.errors });
      } else {
        return response.status(500).json({ message: error.message });
      }
    }
  }
}
