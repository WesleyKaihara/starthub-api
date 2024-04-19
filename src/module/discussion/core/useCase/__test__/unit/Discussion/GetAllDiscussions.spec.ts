import Discussion from '@discussion/core/entity/Discussion';

import { GetAllDiscussions } from '@discussion/core/useCase';
import { DiscussionRepository, DiscussionRepositoryInMemory } from '@discussion/shared/persistence';

describe('GetAllDiscussions', () => {
  let getAllDiscussions: GetAllDiscussions;
  let discussionRepository: DiscussionRepository;

  beforeEach(() => {
    discussionRepository = new DiscussionRepositoryInMemory();
    getAllDiscussions = new GetAllDiscussions(discussionRepository);
  });

  it('should get all discussions', async () => {
    const discussion1 = Discussion.create('Discussion 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 1');
    const discussion2 = Discussion.create('Discussion 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2');
    await discussionRepository.createDiscussion(discussion1);
    await discussionRepository.createDiscussion(discussion2);

    const discussions = await getAllDiscussions.execute();

    expect(discussions).toHaveLength(2);
    expect(discussions[0].title).toBe('Discussion 1');
    expect(discussions[0].context).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. 1');

    expect(discussions[1].title).toBe('Discussion 2');
    expect(discussions[1].context).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2');
  });
});
