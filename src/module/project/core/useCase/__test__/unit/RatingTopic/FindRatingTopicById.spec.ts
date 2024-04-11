import FindRatingTopicById from '@project/core/useCase/RatingTopic/FindRatingTopicByIdUseCase/FindRatingTopicByIdUseCase';
import InMemoryRatingTopicRepository from '@project/shared/persistence/repository/RatingTopicRepository/RatinTopicRepositoryInMemory';
import RatingTopicRepository from '@project/shared/persistence/repository/RatingTopicRepository/RatingTopic.repository';
import RatingTopicBuilder from '../../RatingTopicBuilder';

describe('FindRatingTopicById', () => {
  let findRatingTopicById: FindRatingTopicById;
  let ratingTopicRepository: RatingTopicRepository;

  beforeEach(() => {
    ratingTopicRepository = new InMemoryRatingTopicRepository();
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
    const ratingTopic = await findRatingTopicById.execute(ratingTopicId);

    expect(ratingTopic).toBeNull();
  });
});
