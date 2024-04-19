import Discussion from '@src/module/discussion/core/entity/Discussion';

import { CreateDiscussionBody } from '@src/module/discussion/core/useCase/Discussion/CreateDiscussionUseCase/CreateDiscussion.dto';
import { UpdateDiscussionBody } from '@src/module/discussion/core/useCase/Discussion/UpdateDiscussionUseCase/UpdateDiscussion.dto';

export interface DiscussionRepository {
  getAllDiscussions(): Promise<Discussion[]>;
  findDiscussionById(discussionId: number): Promise<Discussion>;
  createDiscussion(
    input: CreateDiscussionBody,
  ): Promise<Discussion>;
  updateDiscussion(
    id: number,
    input: UpdateDiscussionBody,
  ): Promise<Discussion>;
}
