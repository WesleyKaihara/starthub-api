import Discussion from '@discussion/core/entity/Discussion';

import { GetAllDiscussions } from '@discussion/core/useCase';
import {
  DiscussionRepository,
  DiscussionRepositoryInMemory,
} from '@discussion/shared/persistence';
import { PaginationOptions } from '@src/shared/types/pagination';

describe('GetAllDiscussions', () => {
  let getAllDiscussions: GetAllDiscussions;
  let discussionRepository: DiscussionRepository;

  beforeEach(() => {
    discussionRepository = new DiscussionRepositoryInMemory();
    getAllDiscussions = new GetAllDiscussions(discussionRepository);
  });

  it('should get all discussions', async () => {
    const discussion1 = Discussion.create(
      'Discussion 1',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 1',
    );
    const discussion2 = Discussion.create(
      'Discussion 2',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2',
    );
    await discussionRepository.createDiscussion(discussion1);
    await discussionRepository.createDiscussion(discussion2);

    const paginationOptions: PaginationOptions = {
      page: 1,
      limit: 5,
    };

    const discussions = await getAllDiscussions.execute(paginationOptions);

    expect(discussions).toHaveProperty('hasNextPage');

    expect(discussions.itens.length).toBeGreaterThan(0);
    expect(discussions.itens[0].title).toBe('Discussion 1');
    expect(discussions.itens[0].context).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 1',
    );

    expect(discussions.itens[1].title).toBe('Discussion 2');
    expect(discussions.itens[1].context).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2',
    );
  });
});
