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
import ProjectRatingTopicService from '@project/shared/service/projectRatingTopic.service';
import { CreateRatingTopicDto } from '@project/core/useCase/RatingTopic/CreateRatingTopicUseCase/CreateRatingTopic.dto';
import {
  UpdateRatingTopicDto,
  UpdateRatingTopicDtoSchema,
} from '@project/core/useCase/RatingTopic/UpdateRatingTopicUseCase/UpdateRatingTopic.dto';

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
    const ratingTopic =
      await this.ratingTopicService.findRatingTopicById(topicId);
    if (!ratingTopic) {
      return response.status(404).send({
        message: `Unable to find a rating topic with id ${topicId}.`,
      });
    }
    return response.json(ratingTopic);
  }

  @Post()
  async createRatingTopic(
    @Body() createRatingTopicDto: CreateRatingTopicDto,
    @Res() response: Response,
  ) {
    try {
      const ratingTopic =
        await this.ratingTopicService.createRatingTopic(createRatingTopicDto);
      return response.json(ratingTopic);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Put('/:topicId')
  async updateRatingTopicById(
    @Param('topicId', new ParseIntPipe()) topicId: number,
    @Body() updateRatingTopicDto: UpdateRatingTopicDto,
    @Res() response: Response,
  ) {
    try {
      const validSchema = UpdateRatingTopicDtoSchema.parse(
        updateRatingTopicDto,
      ) as UpdateRatingTopicDto;
      const ratingTopic = await this.ratingTopicService.updateRatingTopic(
        topicId,
        validSchema,
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
