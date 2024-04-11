import Discussion from '@src/module/discussion/core/entity/Discussion';

import { CreateDiscussionDto } from '@src/module/discussion/core/useCase/Discussion/CreateDiscussionUseCase/CreateDiscussion.dto';
import { UpdateDiscussionDto } from '@src/module/discussion/core/useCase/Discussion/UpdateDiscussionUseCase/UpdateDiscussion.dto';

export default interface DiscussionRepository {
  getAllDiscussions(): Promise<Discussion[]>;
  findDiscussionById(discussionId: number): Promise<Discussion>;
  createDiscussion(
    createDiscussionDto: CreateDiscussionDto,
  ): Promise<Discussion>;
  updateDiscussion(
    id: number,
    input: UpdateDiscussionDto,
  ): Promise<Discussion>;
}
