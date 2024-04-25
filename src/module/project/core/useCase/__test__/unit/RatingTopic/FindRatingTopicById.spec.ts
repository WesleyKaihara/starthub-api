import { FindRatingTopicById } from '@project/core/useCase';
import { RatingTopicRepository, RatingTopicRepositoryInMemory } from '@project/shared/persistence';
import RatingTopicBuilder from '../../RatingTopicBuilder';

describe('FindRatingTopicById', () => {
  let findRatingTopicById: FindRatingTopicById;
  let ratingTopicRepository: RatingTopicRepository;

  beforeEach(() => {
    ratingTopicRepository = new RatingTopicRepositoryInMemory();
    findRatingTopicById = new FindRatingTopicById(ratingTopicRepository);
  });

  it('should find ratingTopic by id', async () => {
    const ratingTopicId = 1;
    const expectedRatingTopic = new RatingTopicBuilder()
      .withName('RatingTopic 1')
      .withDescription('Description 1')
      .build();
    await ratingTopicRepository.createRatingTopic(expectedRatingTopic);

    const ratingTopic = await findRatingTopicById.execute(ratingTopicId);

    expect(ratingTopic).toEqual(expectedRatingTopic);
  });

  it('should return null if ratingTopic is not found', async () => {
    const ratingTopicId = 2;

    expect(findRatingTopicById.execute(ratingTopicId))
      .rejects
      .toThrow(`Rating Topic with id ${ratingTopicId} not found`);
  });
});
