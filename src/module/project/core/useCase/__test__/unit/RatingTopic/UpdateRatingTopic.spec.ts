import { UpdateRatingTopic } from '@project/core/useCase';
import {
  RatingTopicRepository,
  RatingTopicRepositoryInMemory,
} from '@project/shared/persistence';
import RatingTopicBuilder from '../../RatingTopicBuilder';

describe('UpdateRatingTopic', () => {
  let updateRatingTopic: UpdateRatingTopic;
  let ratingTopicRepository: RatingTopicRepository;

  beforeEach(() => {
    ratingTopicRepository = new RatingTopicRepositoryInMemory();
    updateRatingTopic = new UpdateRatingTopic(ratingTopicRepository);
  });

  it('should update a ratingTopic', async () => {
    const ratingTopicId = 1;
    const ratingTopic = new RatingTopicBuilder()
      .withName('RatingTopic Name')
      .withDescription('RatingTopic Description')
      .build();
    await ratingTopicRepository.createRatingTopic(ratingTopic);

    const updateRatingTopicDto = new RatingTopicBuilder()
      .withName('Updated RatingTopic Name')
      .withDescription('Updated RatingTopic Description')
      .build();

    const updatedRatingTopic = await updateRatingTopic.execute(
      ratingTopicId,
      updateRatingTopicDto,
    );

    expect(updatedRatingTopic).toBeDefined();
    expect(updatedRatingTopic.name).toBe('Updated RatingTopic Name');
    expect(updatedRatingTopic.description).toBe(
      'Updated RatingTopic Description',
    );
  });

  it('should throw error if ratingTopic name is too short', async () => {
    const ratingTopicId = 1;
    const updateRatingTopicDto = new RatingTopicBuilder()
      .withName('Test')
      .withDescription('Updated RatingTopic Description')
      .build();

    await expect(
      updateRatingTopic.execute(ratingTopicId, updateRatingTopicDto),
    ).rejects.toThrow(/Rating Topic Name must have at least 5/);
  });

  it('should throw error if ratingTopic description is too short', async () => {
    const ratingTopicId = 1;
    const updateRatingTopicDto = new RatingTopicBuilder()
      .withName('Updated RatingTopic Name')
      .withDescription('Test')
      .build();

    await expect(
      updateRatingTopic.execute(ratingTopicId, updateRatingTopicDto),
    ).rejects.toThrow(/Rating Topic Description must have at least 10/);
  });
});
