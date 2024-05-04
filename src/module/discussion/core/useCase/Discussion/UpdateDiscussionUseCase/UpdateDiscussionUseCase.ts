import Discussion from '../../../entity/Discussion';

import { DiscussionRepository } from '@src/module/discussion/shared/persistence';
import { UpdateDiscussionBody } from './UpdateDiscussion.dto';

export class UpdateDiscussion {
  constructor(private readonly discussionRepository: DiscussionRepository) {}

  async execute(
    discussionId: number,
    input: UpdateDiscussionBody,
  ): Promise<Discussion> {
    const discussion = Discussion.update(
      discussionId,
      input.title,
      input.context,
      input.projectId,
    );

    await this.discussionRepository.updateDiscussion(discussionId, discussion);
    return discussion;
  }
}
