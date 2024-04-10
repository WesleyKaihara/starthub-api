import { Injectable } from '@nestjs/common';

import Discussion from '../../core/entity/Discussion';
import { CreateDiscussionDto } from '../../core/useCase/Discussion/CreateDiscussionUseCase/CreateDiscussion.dto';
import { UpdateDiscussionDto } from '../../core/useCase/Discussion/UpdateDiscussionUseCase/UpdateDiscussion.dto';
import FindDiscussionById from '../../core/useCase/Discussion/FindDiscussionById/FindDiscussionByIdUseCase';
import DiscussionRepositorySequelize from '../persistence/repository/DiscussionRepositorySequelize';

@Injectable()
export default class DiscussionService {
  constructor(private readonly discussionRepository: DiscussionRepositorySequelize) {}

  getDiscussions(): Promise<Discussion[]> {
    return this.discussionRepository.getAllDiscussions();
  }

  findDiscussionById(discussionId: number): Promise<Discussion> {
    const findDiscussionById = new FindDiscussionById(this.discussionRepository);
    return findDiscussionById .execute(discussionId);
  }

  async createDiscussion(createDiscussionDto: CreateDiscussionDto): Promise<Discussion> {
    return this.discussionRepository.createDiscussion(createDiscussionDto);
  }

  updateDiscussion(
    discussionId: number,
    updateDiscussionDto: UpdateDiscussionDto,
  ): Promise<Discussion> {
    return this.discussionRepository.updateDiscussion(
      discussionId,
      updateDiscussionDto,
    );
  }
}
