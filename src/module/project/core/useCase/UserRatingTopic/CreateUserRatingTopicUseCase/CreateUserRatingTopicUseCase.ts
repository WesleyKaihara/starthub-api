import UserRatingTopic from '@project/core/entity/UserRatingTopic';
import { CreateUserRatingTopicDto } from './CreateUserRatingTopic.dto';
import UserRatingTopicRepository from '@project/shared/persistence/repository/UserRatingTopicRepository/userRatingTopic.repository';

export default class CreateUserRatingTopic {
  constructor(
    private readonly userRatingTopicRepository: UserRatingTopicRepository,
  ) {}

  async execute(input: CreateUserRatingTopicDto): Promise<UserRatingTopic> {
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
