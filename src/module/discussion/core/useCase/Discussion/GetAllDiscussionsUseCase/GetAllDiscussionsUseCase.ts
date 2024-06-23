import { DiscussionRepository } from '@src/module/discussion/shared/persistence';
import Discussion from '../../../entity/Discussion';
import { Pagination, PaginationOptions } from '@src/shared/types/pagination';

export class GetAllDiscussions {
  constructor(private readonly discussionRepository: DiscussionRepository) {}

  async execute(
    paginationOptions: PaginationOptions,
  ): Promise<Pagination<Discussion>> {
    const discussions =
      await this.discussionRepository.getAllDiscussions(paginationOptions);

    const nextPage = await this.discussionRepository.getAllDiscussions({
      page: paginationOptions.page + 1,
      limit: paginationOptions.limit,
    });

    return {
      itens: discussions,
      total: discussions.length,
      currentPage: paginationOptions.page,
      pageSize: paginationOptions.limit,
      hasNextPage: nextPage.length > 0,
    };
  }
}
