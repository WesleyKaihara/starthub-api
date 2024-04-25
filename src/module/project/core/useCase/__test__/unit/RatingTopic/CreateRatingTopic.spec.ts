import { CreateRatingTopic, CreateRatingTopicBody } from '@project/core/useCase';
import { RatingTopicRepository, RatingTopicRepositoryInMemory } from '@project/shared/persistence';

describe('CreateRatingTopic', () => {
  let createRatingTopic: CreateRatingTopic;
  let ratingTopicRepository: RatingTopicRepository;

  beforeEach(() => {
    ratingTopicRepository = new RatingTopicRepositoryInMemory();
    createRatingTopic = new CreateRatingTopic(ratingTopicRepository);
  });

  it('should create a ratingTopic', async () => {
    const input: CreateRatingTopicBody = {
      name: 'Test RatingTopic',
      description: 'This is a test ratingTopic.',
    };

    const ratingTopic = await createRatingTopic.execute(input);

    expect(ratingTopic).toBeDefined();
    expect(ratingTopic.name).toBe('Test RatingTopic');
    expect(ratingTopic.description).toBe('This is a test ratingTopic.');
  });

  it('should throw error if rating topic name is too short', async () => {
    const input: CreateRatingTopicBody = {
      name: 'Test',
      description: 'This is a test ratingTopic.',
    };

    await expect(createRatingTopic.execute(input)).rejects.toThrow(
      /Rating Topic Name must have at least 5/,
    );
  });

  it('should throw error if rating topic description is too short', async () => {
    const input: CreateRatingTopicBody = {
      name: 'Test RatingTopic',
      description: 'Test',
    };

    await expect(createRatingTopic.execute(input)).rejects.toThrow(
      /Rating Topic Description must have at least 10/,
    );
  });
});
