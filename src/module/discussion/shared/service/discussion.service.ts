import { Injectable } from '@nestjs/common';

import Discussion from '../../core/entity/Discussion';
import { DiscussionRepositorySequelize } from '../persistence/repository/Discussion/DiscussionRepositorySequelize';
import { CreateDiscussionBody, FindDiscussionById, UpdateDiscussionBody } from '@discussion/core/useCase';

@Injectable()
export default class DiscussionService {
  constructor(
    private readonly discussionRepository: DiscussionRepositorySequelize,
  ) { }

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
