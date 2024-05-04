import { DiscussionRepository } from '@src/module/discussion/shared/persistence';
import Discussion from '../../../entity/Discussion';

export class GetAllDiscussionsByProject {
  constructor(private readonly discussionRepository: DiscussionRepository) {}

  async execute(projectId: number): Promise<Discussion[]> {
    const discussions =
      await this.discussionRepository.getAllDiscussionsByProject(projectId);
    return discussions;
  }
}
