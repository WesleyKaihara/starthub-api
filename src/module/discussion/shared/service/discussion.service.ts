import { Injectable } from '@nestjs/common';

import Discussion from '../../core/entity/Discussion';
import { CreateDiscussionBody } from '../../core/useCase/Discussion/CreateDiscussionUseCase/CreateDiscussion.dto';
import { UpdateDiscussionBody } from '../../core/useCase/Discussion/UpdateDiscussionUseCase/UpdateDiscussion.dto';
import FindDiscussionById from '../../core/useCase/Discussion/FindDiscussionById/FindDiscussionByIdUseCase';
import DiscussionRepositorySequelize from '../persistence/repository/Discussion/DiscussionRepositorySequelize';

@Injectable()
export default class DiscussionService {
  constructor(
    private readonly discussionRepository: DiscussionRepositorySequelize,
  ) {}

  getDiscussions(): Promise<Discussion[]> {
    return this.discussionRepository.getAllDiscussions();
  }

  findDiscussionById(discussionId: number): Promise<Discussion> {
    const findDiscussionById = new FindDiscussionById(
      this.discussionRepository,
    );
    return findDiscussionById.execute(discussionId);
  }

  async createDiscussion(
    input: CreateDiscussionBody,
  ): Promise<Discussion> {
    return this.discussionRepository.createDiscussion(input);
  }

  updateDiscussion(
    discussionId: number,
    input: UpdateDiscussionBody,
  ): Promise<Discussion> {
    return this.discussionRepository.updateDiscussion(
      discussionId,
      input,
    );
  }
}
