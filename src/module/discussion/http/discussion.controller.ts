import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
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
  async listDiscussions(
    @Res() response: Response,
    @Query(
      'page',
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            'Deve ser informado a página para listagem das discussões',
          ),
      }),
    )
    page: number = 1,
    @Query(
      'limit',
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException('Deve ser informado o tamanho da página'),
      }),
    )
    limit: number = 10,
  ) {
    try {
      const paginationOptions = { page, limit };
      const discussions =
        await this.discussionService.getDiscussions(paginationOptions);
      return response.json(discussions);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  @Get('/project/:projectId')
  async getDiscussionsByProject(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Res() response: Response,
  ) {
    try {
      const discussion =
        await this.discussionService.getDiscussionsByProject(projectId);
      return response.json(discussion);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Get('/:discussionId')
  async getDiscussionById(
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
