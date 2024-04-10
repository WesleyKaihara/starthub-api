import RatingTopic from '@project/core/entity/RatingTopic';
import { CreateRatingTopicDto } from '@project/core/useCase/RatingTopic/CreateRatingTopicUseCase/CreateRatingTopic.dto';
import { UpdateRatingTopicBody } from '@project/core/useCase/RatingTopic/UpdateRatingTopicUseCase/UpdateRatingTopic.dto';

export default interface RatingTopicRepository {
  getAllRatingTopic(): Promise<RatingTopic[]>;
  findRatingTopicById(topicId: number): Promise<RatingTopic>;
  createRatingTopic(
    createRatingTopicDto: CreateRatingTopicDto,
  ): Promise<RatingTopic>;
  updateRatingTopic(
    topicId: number,
    updateRatingTopicBody: UpdateRatingTopicBody,
  ): Promise<RatingTopic>;
}
