import { CreateDiscussion, CreateDiscussionBody } from '@discussion/core/useCase';
import { DiscussionRepository, DiscussionRepositoryInMemory } from '@discussion/shared/persistence';

describe('CreateDiscussion', () => {
  let createDiscussion: CreateDiscussion;
  let discussionRepository: DiscussionRepository;

  beforeEach(() => {
    discussionRepository = new DiscussionRepositoryInMemory();
    createDiscussion = new CreateDiscussion(discussionRepository);
  });

  const context = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  it('should create a discussion', async () => {
    const input: CreateDiscussionBody = {
      title: 'Test Discussion',
      context,
    };

    const discussion = await createDiscussion.execute(input);

    expect(discussion).toBeDefined();
    expect(discussion.title).toBe('Test Discussion');
    expect(discussion.context).toBe(context);
  });

  it('should throw error if discussion name is too short', async () => {
    const input: CreateDiscussionBody = {
      title: 'Test',
      context: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };

    await expect(createDiscussion.execute(input)).rejects.toThrow(
      /Discussion title must have at least 10 characters/,
    );
  });

  it('should throw error if discussion description is too short', async () => {
    const input: CreateDiscussionBody = {
      title: 'Test Discussion',
      context: 'test',
    };

    await expect(createDiscussion.execute(input)).rejects.toThrow(
      /Discussion context must have at least 30 characters/,
    );
  });
});
