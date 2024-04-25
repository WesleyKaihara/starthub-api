import RatingTopic from '@project/core/entity/RatingTopic';
import { CreateRatingTopicBody } from '@project/core/useCase/RatingTopic/CreateRatingTopicUseCase/CreateRatingTopic.dto';
import { UpdateRatingTopicBody } from '@project/core/useCase/RatingTopic/UpdateRatingTopicUseCase/UpdateRatingTopic.dto';

export interface RatingTopicRepository {
  getAllRatingTopics(): Promise<RatingTopic[]>;
  findRatingTopicById(topicId: number): Promise<RatingTopic>;
  createRatingTopic(
    createRatingTopicBody: CreateRatingTopicBody,
  ): Promise<RatingTopic>;
  updateRatingTopic(
    topicId: number,
    updateRatingTopicBody: UpdateRatingTopicBody,
  ): Promise<RatingTopic>;
}
