import Discussion from '@src/module/discussion/core/entity/Discussion';

import { CreateDiscussionBody } from '@src/module/discussion/core/useCase/Discussion/CreateDiscussionUseCase/CreateDiscussion.dto';
import { UpdateDiscussionBody } from '@src/module/discussion/core/useCase/Discussion/UpdateDiscussionUseCase/UpdateDiscussion.dto';
import { PaginationOptions } from '@src/shared/types/pagination';

export interface DiscussionRepository {
  getAllDiscussions(
    paginationOptions: PaginationOptions,
  ): Promise<Discussion[]>;
  getAllDiscussionsByProject(projectId: number): Promise<Discussion[]>;
  findDiscussionById(discussionId: number): Promise<Discussion>;
  createDiscussion(input: CreateDiscussionBody): Promise<Discussion>;
  updateDiscussion(
    id: number,
    input: UpdateDiscussionBody,
  ): Promise<Discussion>;
}
