import { Injectable } from '@nestjs/common';

import RatingTopic from '@project/core/entity/RatingTopic';
import RatingTopicRepositorySequelize from '../persistence/repository/RatingTopicRepository/RatingTopicRepositorySequelize';
import GetAllRatingTopics from '@project/core/useCase/RatingTopic/GetAllRatingTopicsUseCase/GetAllRatingTopicsUseCase';
import FindRatingTopicById from '@project/core/useCase/RatingTopic/FindRatingTopicByIdUseCase/FindRatingTopicByIdUseCase';
import { CreateRatingTopicDto } from '@project/core/useCase/RatingTopic/CreateRatingTopicUseCase/CreateRatingTopic.dto';
import CreateRatingTopic from '@project/core/useCase/RatingTopic/CreateRatingTopicUseCase/CreateRatingTopicUseCase';
import { UpdateRatingTopicDto } from '@project/core/useCase/RatingTopic/UpdateRatingTopicUseCase/UpdateRatingTopic.dto';
import UpdateRatingTopic from '@project/core/useCase/RatingTopic/UpdateRatingTopicUseCase/UpdateRatingTopicUseCase';

@Injectable()
export default class RatingTopicService {
  constructor(
    private readonly ratingTopicRepository: RatingTopicRepositorySequelize,
  ) {}

  getAllRatingTopics(): Promise<RatingTopic[]> {
    const getAllRatingTopics = new GetAllRatingTopics(
      this.ratingTopicRepository,
    );
    return getAllRatingTopics.execute();
  }

  findRatingTopicById(topicId: number): Promise<RatingTopic> {
    const findRatingTopicById = new FindRatingTopicById(
      this.ratingTopicRepository,
    );
    return findRatingTopicById.execute(topicId);
  }

  async createRatingTopic(
    createRatingTopicDto: CreateRatingTopicDto,
  ): Promise<RatingTopic> {
    const createRatingTopic = new CreateRatingTopic(this.ratingTopicRepository);
    return createRatingTopic.execute(createRatingTopicDto);
  }

  updateRatingTopic(
    topicId: number,
    updateRatingTopicDto: UpdateRatingTopicDto,
  ): Promise<RatingTopic> {
    const updateRatingTopic = new UpdateRatingTopic(this.ratingTopicRepository);
    return updateRatingTopic.execute(topicId, updateRatingTopicDto);
  }
}
