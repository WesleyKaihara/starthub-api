import { Injectable } from '@nestjs/common';

import UserRatingTopic from '@project/core/entity/UserRatingTopic';

import {UserRatingTopicRepositorySequelize} from '../persistence';
import { CreateUserRatingTopic, CreateUserRatingTopicBody, GetAllUserRatingTopics } from '@project/core/useCase';

@Injectable()
export default class UserRatingTopicService {
  constructor(
    private readonly userRatingTopicRepository: UserRatingTopicRepositorySequelize,
  ) {}

  getAllUserRatingTopics(): Promise<UserRatingTopic[]> {
    const getAllUserRatingTopics = new GetAllUserRatingTopics(
      this.userRatingTopicRepository,
    );
    return getAllUserRatingTopics.execute();
  }

  async createUserRatingTopic(
    input: CreateUserRatingTopicBody,
  ): Promise<UserRatingTopic> {
    const createUserRatingTopic = new CreateUserRatingTopic(
      this.userRatingTopicRepository,
    );
    return createUserRatingTopic.execute(input);
  }
}
