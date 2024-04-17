import DiscussionRepository from '@src/module/discussion/shared/persistence/repository/Discussion/discussion.repository';
import { CreateDiscussionBody } from './CreateDiscussion.dto';
import Discussion from '../../../entity/Discussion';

export default class CreateDiscussion {
  constructor(private readonly discussionRepository: DiscussionRepository) {}

  async execute(input: CreateDiscussionBody): Promise<Discussion> {
    const discussion = Discussion.create(input.title, input.context);
    await this.discussionRepository.createDiscussion(discussion);
    return discussion;
  }
}
