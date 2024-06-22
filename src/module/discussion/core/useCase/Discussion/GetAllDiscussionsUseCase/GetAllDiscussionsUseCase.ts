import { DiscussionRepository } from '@src/module/discussion/shared/persistence';
import Discussion from '../../../entity/Discussion';
import { PaginationOptions } from '@src/shared/types/pagination';

export class GetAllDiscussions {
  constructor(private readonly discussionRepository: DiscussionRepository) {}

  async execute(paginationOptions: PaginationOptions): Promise<Discussion[]> {
    const discussions =
      await this.discussionRepository.getAllDiscussions(paginationOptions);
    return discussions;
  }
}
