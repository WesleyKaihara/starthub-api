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

import DiscussionService from '../shared/service/discussion.service';
import { CreateDiscussionBody } from '../core/useCase/Discussion/CreateDiscussionUseCase/CreateDiscussion.dto';
import { UpdateDiscussionBody } from '@discussion/core/useCase';

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

  @Get('/:discussionId')
  async findProjectById(
    @Param('discussionId', new ParseIntPipe()) discussionId: number,
    @Res() response: Response,
  ) {
    try {
      const discussion =
        await this.discussionService.findDiscussionById(discussionId);
      return response.json(discussion);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post()
  async createDiscussion(
    @Body() input: CreateDiscussionBody,
    @Res() response: Response,
  ) {
    try {
      const discussion = await this.discussionService.createDiscussion(input);
      return response.json(discussion);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Put('/:discussionId')
  async updateProjectById(
    @Param('discussionId', new ParseIntPipe()) discussionId: number,
    @Body() input: UpdateDiscussionBody,
    @Res() response: Response,
  ) {
    try {
      const project = await this.discussionService.updateDiscussion(
        discussionId,
        input,
      );
      return response.json(project);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
