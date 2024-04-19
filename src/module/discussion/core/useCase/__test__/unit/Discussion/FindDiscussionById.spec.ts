
import DiscussionBuilder from '../../DiscussionBuilder';
import { DiscussionRepository, DiscussionRepositoryInMemory } from '@discussion/shared/persistence';
import { FindDiscussionById } from '@discussion/core/useCase';

describe('FindDiscussionById', () => {
  let findDiscussionById: FindDiscussionById;
  let discussionRepository: DiscussionRepository;

  beforeEach(() => {
    discussionRepository = new DiscussionRepositoryInMemory();
    findDiscussionById = new FindDiscussionById(discussionRepository);
  });

  it('should find discussion by id', async () => {
    const discussionId = 1;
    const expectedDiscussion = new DiscussionBuilder()
      .withTitle('Discussion 1')
      .withContext('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
      .build();
    await discussionRepository.createDiscussion(expectedDiscussion);

    const discussion = await findDiscussionById.execute(discussionId);

    expect(discussion).toEqual(expectedDiscussion);
  });

  it('should return null if discussion is not found', async () => {
    const discussionId = 2;
    const discussion = await findDiscussionById.execute(discussionId);

    expect(discussion).toBeNull();
  });
});
