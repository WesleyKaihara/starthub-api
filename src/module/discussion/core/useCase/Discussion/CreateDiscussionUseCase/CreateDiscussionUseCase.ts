import { DiscussionRepository } from '@src/module/discussion/shared/persistence';
import { CreateDiscussionBody } from './CreateDiscussion.dto';
import Discussion from '../../../entity/Discussion';

export class CreateDiscussion {
  constructor(private readonly discussionRepository: DiscussionRepository) {}

  async execute(input: CreateDiscussionBody): Promise<Discussion> {
    const discussion = Discussion.create(
      input.title,
      input.context,
      input.projectId,
    );
    await this.discussionRepository.createDiscussion(discussion);
    return discussion;
  }
}
