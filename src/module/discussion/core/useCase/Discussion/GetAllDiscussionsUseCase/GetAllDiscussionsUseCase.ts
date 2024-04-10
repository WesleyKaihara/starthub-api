import DiscussionRepository from '@src/module/discussion/shared/persistence/repository/discussion.repository';
import Discussion from '../../../entity/Discussion';

export default class GetAllDiscussions {
  constructor(private readonly discussionRepository: DiscussionRepository) {}

  async execute(): Promise<Discussion[]> {
    const discussions = await this.discussionRepository.getAllDiscussions();
    return discussions;
  }
}
