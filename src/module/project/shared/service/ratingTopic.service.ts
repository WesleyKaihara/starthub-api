import { Injectable } from '@nestjs/common';
import { RatingTopicRepositorySequelize } from '../persistence';
import RatingTopic from '@project/core/entity/RatingTopic';
import {
  CreateRatingTopic,
  CreateRatingTopicBody,
  FindRatingTopicById,
  GetAllRatingTopics,
  UpdateRatingTopic,
  UpdateRatingTopicBody,
} from '@project/core/useCase';

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

  async createRatingTopic(input: CreateRatingTopicBody): Promise<RatingTopic> {
    const createRatingTopic = new CreateRatingTopic(this.ratingTopicRepository);
    return createRatingTopic.execute(input);
  }

  updateRatingTopic(
    topicId: number,
    updateRatingTopicBody: UpdateRatingTopicBody,
  ): Promise<RatingTopic> {
    const updateRatingTopic = new UpdateRatingTopic(this.ratingTopicRepository);
    return updateRatingTopic.execute(topicId, updateRatingTopicBody);
  }
}
