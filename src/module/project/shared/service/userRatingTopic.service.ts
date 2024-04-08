import { Injectable } from '@nestjs/common';

import UserRatingTopic from '@project/core/entity/UserRatingTopic';

import UserRatingTopicRepositorySequelize from '../persistence/repository/UserRatingTopicRepository/UserRatingTopicRepositorySequelize';
import CreateUserRatingTopic from '@project/core/useCase/UserRatingTopic/CreateUserRatingTopicUseCase/CreateUserRatingTopicUseCase';
import { CreateUserRatingTopicDto } from '@project/core/useCase/UserRatingTopic/CreateUserRatingTopicUseCase/CreateUserRatingTopic.dto';

@Injectable()
export default class UserRatingTopicService {
  constructor(
    private readonly userRatingTopicRepository: UserRatingTopicRepositorySequelize,
  ) {}

  async createUserRatingTopic(
    createUserRatingTopicDto: CreateUserRatingTopicDto,
  ): Promise<UserRatingTopic> {
    const createUserRatingTopic = new CreateUserRatingTopic(this.userRatingTopicRepository);
    return createUserRatingTopic.execute(createUserRatingTopicDto);
  }
}
