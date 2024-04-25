import { CreateUserRatingTopic, CreateUserRatingTopicBody } from '@project/core/useCase';
import { UserRatingTopicRepository, UserRatingTopicRepositoryInMemory } from '@project/shared/persistence';
import UserRatingTopicBuilder from '../../UserRatingTopicBuilder';

describe('CreateUserRatingTopic', () => {
  let createUserRatingTopic: CreateUserRatingTopic;
  let userRatingTopicRepository: UserRatingTopicRepository;

  beforeEach(() => {
    userRatingTopicRepository = new UserRatingTopicRepositoryInMemory();
    createUserRatingTopic = new CreateUserRatingTopic(userRatingTopicRepository);
  });

  it('should create a userRatingTopic', async () => {
    const input: CreateUserRatingTopicBody =
      new UserRatingTopicBuilder()
        .withUserId(1)
        .withProjectId(1)
        .withRatingTopicId(1)
        .withValue(10)
        .build();

    const userRatingTopic = await createUserRatingTopic.execute(input);

    expect(userRatingTopic).toBeDefined();
    expect(userRatingTopic.userId).toBe(1);
    expect(userRatingTopic.projectId).toBe(1);
    expect(userRatingTopic.ratingTopicId).toBe(1);
    expect(userRatingTopic.value).toBe(10);
  });

  it('should throw error if userId value is invalid', async () => {
    const input: CreateUserRatingTopicBody =
      new UserRatingTopicBuilder()
        .withUserId(-1)
        .withProjectId(1)
        .withRatingTopicId(1)
        .withValue(10)
        .build();

    await expect(createUserRatingTopic.execute(input)).rejects.toThrow(
      /User ID needs greater than 0/,
    );
  });

  it('should throw error if projectId value is invalid', async () => {
    const input: CreateUserRatingTopicBody =
      new UserRatingTopicBuilder()
        .withUserId(1)
        .withProjectId(-5)
        .withRatingTopicId(1)
        .withValue(10)
        .build();

    await expect(createUserRatingTopic.execute(input)).rejects.toThrow(
      /Project ID needs greater than 0/,
    );
  });

  it('should throw error if ratingTopicId value is invalid', async () => {
    const input: CreateUserRatingTopicBody =
      new UserRatingTopicBuilder()
        .withUserId(1)
        .withProjectId(1)
        .withRatingTopicId(-7)
        .withValue(10)
        .build();

    await expect(createUserRatingTopic.execute(input)).rejects.toThrow(
      /Rating Topic ID needs greater than 0/,
    );
  });

  it('should throw error if value is invalid', async () => {
    const input: CreateUserRatingTopicBody =
      new UserRatingTopicBuilder()
        .withUserId(1)
        .withProjectId(1)
        .withRatingTopicId(1)
        .withValue(-10)
        .build();

    await expect(createUserRatingTopic.execute(input)).rejects.toThrow(
      /Value of rating needs greater than 0/,
    );
  });
});
