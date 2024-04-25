import { DiscussionRepository } from '@src/module/discussion/shared/persistence';
import Discussion from '../../../entity/Discussion';

export class GetAllDiscussions {
  constructor(private readonly discussionRepository: DiscussionRepository) {}

  async execute(): Promise<Discussion[]> {
    const discussions = await this.discussionRepository.getAllDiscussions();
    return discussions;
  }
}
