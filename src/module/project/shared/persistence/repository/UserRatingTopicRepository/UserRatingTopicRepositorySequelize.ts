import { Injectable } from '@nestjs/common';

import UserRatingTopicRepository from './userRatingTopic.repository';
import { CreateUserRatingTopicDto } from '@project/core/useCase/UserRatingTopic/CreateUserRatingTopicUseCase/CreateUserRatingTopic.dto';

import UserRatingTopic from '@project/core/entity/UserRatingTopic';
import UserRatingTopicModel from '../../model/UserRatingTopicModel';

@Injectable()
export default class UserRatingTopicRepositorySequelize implements UserRatingTopicRepository {
  public getAllUserRatingTopics(): Promise<UserRatingTopic[]> {
    return UserRatingTopicModel.findAll()
      .then((userRatingTopics) => {
        return userRatingTopics as UserRatingTopic[];
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  public createUserRatingTopic(createUserRatingTopicDto: CreateUserRatingTopicDto): Promise<UserRatingTopic> {
    return UserRatingTopicModel.create(createUserRatingTopicDto as any);
  }
}
