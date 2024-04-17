import DiscussionRepository from '@src/module/discussion/shared/persistence/repository/Discussion/discussion.repository';
import Discussion from '../../../entity/Discussion';

export class FindDiscussionById {
  constructor(private readonly projectRepository: DiscussionRepository) {}

  async execute(discussionId: number): Promise<Discussion> {
    const discussion =
      await this.projectRepository.findDiscussionById(discussionId);
    return discussion;
  }
}
