import { Injectable } from '@nestjs/common';

import UserRatingTopicRepository from './userRatingTopic.repository';
import { CreateUserRatingTopicDto } from '@project/core/useCase/UserRatingTopic/CreateUserRatingTopicUseCase/CreateUserRatingTopic.dto';

import UserRatingTopic from '@project/core/entity/UserRatingTopic';
import UserRatingTopicModel from '../../model/UserRatingTopicModel';

@Injectable()
export default class UserRatingTopicRepositorySequelize implements UserRatingTopicRepository {
  public createUserRatingTopic(createUserRatingTopicDto: CreateUserRatingTopicDto): Promise<UserRatingTopic> {
    return UserRatingTopicModel.create(createUserRatingTopicDto as any);
  }
}
