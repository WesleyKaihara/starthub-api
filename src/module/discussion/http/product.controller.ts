import {
  Body,
  Controller,
  Get,
  Post,
  Res,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import DiscussionService from '../shared/service/discussion.service';
import { CreateDiscussionDto } from '../core/useCase/Discussion/CreateDiscussionUseCase/CreateDiscussion.dto';

@Controller('/discussion')
@ApiTags('Discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Get()
  async listDiscussions(@Res() response: Response) {
    try {
      const discussions = await this.discussionService.getDiscussions();
      return response.json(discussions);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  @Post()
  async createDiscussion(
    @Body() createDiscussionDto: CreateDiscussionDto,
    @Res() response: Response,
  ) {
    try {
      const discussion = await this.discussionService.createDiscussion(createDiscussionDto);
      return response.json(discussion);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

}
