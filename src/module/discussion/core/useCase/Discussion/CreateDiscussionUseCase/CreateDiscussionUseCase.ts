import DiscussionRepository from '@src/module/discussion/shared/persistence/repository/discussion.repository';
import { CreateDiscussionDto } from './CreateDiscussion.dto';
import Discussion from '../../../entity/Discussion';

export default class CreateDiscussion {
  constructor(private readonly discussionRepository: DiscussionRepository) {}

  async execute(input: CreateDiscussionDto): Promise<Discussion> {
    const discussion = Discussion.set(input.title, input.context);
    await this.discussionRepository.createDiscussion(discussion);
    return discussion;
  }
}
