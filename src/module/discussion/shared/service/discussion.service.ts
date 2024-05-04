import { Injectable } from '@nestjs/common';

import Discussion from '../../core/entity/Discussion';
import { DiscussionRepositorySequelize } from '../persistence/repository/Discussion/DiscussionRepositorySequelize';
import {
  CreateDiscussionBody,
  FindDiscussionById,
  GetAllDiscussions,
  GetAllDiscussionsByProject,
  UpdateDiscussion,
  UpdateDiscussionBody,
} from '@discussion/core/useCase';

@Injectable()
export default class DiscussionService {
  constructor(
    private readonly discussionRepository: DiscussionRepositorySequelize,
  ) {}

  getDiscussions(): Promise<Discussion[]> {
    const getAllDiscussions = new GetAllDiscussions(this.discussionRepository);
    return getAllDiscussions.execute();
  }

  getDiscussionsByProject(projectId: number): Promise<Discussion[]> {
    const getAllDiscussions = new GetAllDiscussionsByProject(
      this.discussionRepository,
    );
    return getAllDiscussions.execute(projectId);
  }

  findDiscussionById(discussionId: number): Promise<Discussion> {
    const findDiscussionById = new FindDiscussionById(
      this.discussionRepository,
    );
    return findDiscussionById.execute(discussionId);
  }

  async createDiscussion(input: CreateDiscussionBody): Promise<Discussion> {
    return this.discussionRepository.createDiscussion(input);
  }

  updateDiscussion(
    discussionId: number,
    input: UpdateDiscussionBody,
  ): Promise<Discussion> {
    const updateDiscussion = new UpdateDiscussion(this.discussionRepository);
    return updateDiscussion.execute(discussionId, input);
  }
}
