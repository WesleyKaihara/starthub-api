import Discussion from '../../../entity/Discussion';

import DiscussionRepository from '@src/module/discussion/shared/persistence/repository/discussion.repository';
import { UpdateDiscussionDto } from './UpdateDiscussion.dto';

export default class CreateDiscussion {
  constructor(private readonly discussionRepository: DiscussionRepository) {}

  async execute(discussionId: number, input: UpdateDiscussionDto): Promise<Discussion> {
    const discussion = Discussion.set(input.title, input.context);

    await this.discussionRepository.updateDiscussion(discussionId, discussion);
    return discussion;
  }
}
