import RatingTopic from '@project/core/entity/RatingTopic';
import { GetAllRatingTopics } from '@project/core/useCase';
import {
  RatingTopicRepository,
  RatingTopicRepositoryInMemory,
} from '@project/shared/persistence';

describe('GetAllRatingTopic', () => {
  let getAllRatingTopics: GetAllRatingTopics;
  let ratingTopicRepository: RatingTopicRepository;

  beforeEach(() => {
    ratingTopicRepository = new RatingTopicRepositoryInMemory();
    getAllRatingTopics = new GetAllRatingTopics(ratingTopicRepository);
  });

  it('should get all ratingTopics', async () => {
    const ratingTopic1 = RatingTopic.create('RatingTopic 1', 'Description 1');
    const ratingTopic2 = RatingTopic.create('RatingTopic 2', 'Description 2');
    await ratingTopicRepository.createRatingTopic(ratingTopic1);
    await ratingTopicRepository.createRatingTopic(ratingTopic2);

    const ratingTopics = await getAllRatingTopics.execute();

    expect(ratingTopics).toHaveLength(2);
    expect(ratingTopics[0].name).toBe('RatingTopic 1');
    expect(ratingTopics[0].description).toBe('Description 1');

    expect(ratingTopics[1].name).toBe('RatingTopic 2');
    expect(ratingTopics[1].description).toBe('Description 2');
  });
});
