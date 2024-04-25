import UserRatingTopic from '@project/core/entity/UserRatingTopic';
import { CreateUserRatingTopicBody, GetAllUserRatingTopics } from '@project/core/useCase';
import { UserRatingTopicRepository, UserRatingTopicRepositoryInMemory } from '@project/shared/persistence';
import UserRatingTopicBuilder from '../../UserRatingTopicBuilder';

describe('GetAllUserRatingTopic', () => {
  let getAllUserRatingTopics: GetAllUserRatingTopics;
  let userRatingTopicRepository: UserRatingTopicRepository;

  beforeEach(() => {
    userRatingTopicRepository = new UserRatingTopicRepositoryInMemory();
    getAllUserRatingTopics = new GetAllUserRatingTopics(userRatingTopicRepository);
  });

  it('should get all userRatingTopics', async () => {
    const userRatingTopic1: CreateUserRatingTopicBody =
      new UserRatingTopicBuilder()
        .withUserId(1)
        .withProjectId(1)
        .withRatingTopicId(1)
        .withValue(10)
        .build();

    const userRatingTopic2: CreateUserRatingTopicBody =
      new UserRatingTopicBuilder()
        .withUserId(2)
        .withProjectId(1)
        .withRatingTopicId(1)
        .withValue(8)
        .build();

    await userRatingTopicRepository.createUserRatingTopic(userRatingTopic1);
    await userRatingTopicRepository.createUserRatingTopic(userRatingTopic2);

    const userRatingTopics = await getAllUserRatingTopics.execute();

    expect(userRatingTopics).toHaveLength(2);
    expect(userRatingTopics[0].userId).toBe(1);
    expect(userRatingTopics[0].projectId).toBe(1);
    expect(userRatingTopics[0].ratingTopicId).toBe(1);
    expect(userRatingTopics[0].value).toBeGreaterThan(0);

    expect(userRatingTopics[1].userId).toBe(2);
    expect(userRatingTopics[1].projectId).toBe(1);
    expect(userRatingTopics[1].ratingTopicId).toBe(1);
    expect(userRatingTopics[1].value).toBeGreaterThan(0);
  });
});
