import DiscussionBuilder from '../../DiscussionBuilder';

import { UpdateDiscussion } from '@discussion/core/useCase';
import { DiscussionRepository, DiscussionRepositoryInMemory } from '@discussion/shared/persistence';

describe('UpdateDiscussion', () => {
  let updateDiscussion: UpdateDiscussion;
  let discussionRepository: DiscussionRepository;

  beforeEach(() => {
    discussionRepository = new DiscussionRepositoryInMemory();
    updateDiscussion = new UpdateDiscussion(discussionRepository);
  });

  it('should update a discussion', async () => {
    const discussionId = 1;

    const context = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const discussion = new DiscussionBuilder()
      .withTitle('Updated Discussion Title')
      .withContext(context)
      .build();
    await discussionRepository.createDiscussion(discussion);

    const updateDiscussionDto = new DiscussionBuilder()
      .withTitle('Updated Discussion Title')
      .withContext(context)
      .build();

    const updatedDiscussion = await updateDiscussion.execute(
      discussionId,
      updateDiscussionDto,
    );

    expect(updatedDiscussion).toBeDefined();
    expect(updatedDiscussion.title).toBe('Updated Discussion Title');
    expect(updatedDiscussion.context).toBe(context);
  });

  it('should throw error if discussion name is too short', async () => {
    const discussionId = 1;
    const updateDiscussionDto = new DiscussionBuilder()
      .withTitle('Test')
      .withContext('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
      .build();

    await expect(
      updateDiscussion.execute(discussionId, updateDiscussionDto),
    ).rejects.toThrow(/Discussion title must have at least 10 characters/);
  });

  it('should throw error if discussion description is too short', async () => {
    const discussionId = 1;
    const updateDiscussionDto = new DiscussionBuilder()
      .withTitle('Discussion Title')
      .withContext('Test')
      .build();

    await expect(
      updateDiscussion.execute(discussionId, updateDiscussionDto),
    ).rejects.toThrow(/Discussion context must have at least 30 characters/);
  });

});
