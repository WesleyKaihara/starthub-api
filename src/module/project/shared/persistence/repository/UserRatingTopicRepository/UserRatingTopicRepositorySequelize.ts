import { Injectable } from '@nestjs/common';

import { UserRatingTopicRepository } from './userRatingTopic.repository';
import { CreateUserRatingTopicBody } from '@project/core/useCase';

import UserRatingTopic from '@project/core/entity/UserRatingTopic';
import UserRatingTopicModel from '../../model/UserRatingTopicModel';

@Injectable()
export class UserRatingTopicRepositorySequelize
  implements UserRatingTopicRepository {
  async getAllUserRatingTopics(): Promise<UserRatingTopic[]> {
    const userRatingTopics = await UserRatingTopicModel.findAll();

    return userRatingTopics.map((row) =>
      UserRatingTopic.restore(row.id,
        row.value,
        row.userId,
        row.projectId,
        row.ratingTopicId),
    );
  }

  async createUserRatingTopic(
    input: CreateUserRatingTopicBody,
  ): Promise<UserRatingTopic> {
    const userRatingTopic: UserRatingTopicModel = await UserRatingTopicModel.create({
      value: input.value,
      userId: input.userId,
      projectId: input.projectId,
      ratingTopicId: input.ratingTopicId,
    });

    return UserRatingTopic.restore(
      userRatingTopic.id,
      userRatingTopic.value,
      userRatingTopic.userId,
      userRatingTopic.projectId,
      userRatingTopic.ratingTopicId,
    );

  }
}
