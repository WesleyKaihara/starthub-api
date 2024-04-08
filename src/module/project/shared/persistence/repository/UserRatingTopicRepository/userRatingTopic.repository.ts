import UserRatingTopic from '@project/core/entity/UserRatingTopic';

import { CreateUserRatingTopicDto } from '@project/core/useCase/UserRatingTopic/CreateUserRatingTopicUseCase/CreateUserRatingTopic.dto';

export default interface UserRatingTopicRepository {
  createUserRatingTopic(createUserRatingTopic: CreateUserRatingTopicDto): Promise<UserRatingTopic>;
}
