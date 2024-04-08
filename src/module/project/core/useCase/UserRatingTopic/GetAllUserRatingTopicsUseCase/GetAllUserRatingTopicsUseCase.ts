import UserRatingTopic from '@project/core/entity/UserRatingTopic';
import UserRatingTopicRepository from '@project/shared/persistence/repository/UserRatingTopicRepository/userRatingTopic.repository';

export default class GetAllUserRatingTopics {
  constructor(private readonly userRatingTopicRepository: UserRatingTopicRepository) {}

  async execute(): Promise<UserRatingTopic[]> {
    const userRatingTopics = await this.userRatingTopicRepository.getAllUserRatingTopics();
    return userRatingTopics;
  }
}
