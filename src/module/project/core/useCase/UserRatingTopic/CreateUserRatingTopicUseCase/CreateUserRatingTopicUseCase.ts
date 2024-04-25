import UserRatingTopic from '@project/core/entity/UserRatingTopic';
import { CreateUserRatingTopicBody } from './CreateUserRatingTopic.dto';
import { UserRatingTopicRepository } from '@project/shared/persistence';

export class CreateUserRatingTopic {
  constructor(
    private readonly userRatingTopicRepository: UserRatingTopicRepository,
  ) { }

  async execute(input: CreateUserRatingTopicBody): Promise<UserRatingTopic> {
    const ratingTopic = UserRatingTopic.create(
      input.userId,
      input.projectId,
      input.ratingTopicId,
      input.value,
    );
    await this.userRatingTopicRepository.createUserRatingTopic(ratingTopic);
    return ratingTopic;
  }
}
