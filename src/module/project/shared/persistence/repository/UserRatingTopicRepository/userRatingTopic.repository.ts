import UserRatingTopic from '@project/core/entity/UserRatingTopic';

import { CreateUserRatingTopicBody } from '@project/core/useCase';

export interface UserRatingTopicRepository {
  getAllUserRatingTopics(): Promise<UserRatingTopic[]>;
  createUserRatingTopic(
    input: CreateUserRatingTopicBody,
  ): Promise<UserRatingTopic>;
}
