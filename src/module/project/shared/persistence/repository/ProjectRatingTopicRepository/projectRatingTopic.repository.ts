import RatingTopic from '@project/core/entity/RatingTopic';

import { CreateProjectRatingTopicDto } from '@project/core/useCase/RatingTopic/CreateProjectRatingTopicUseCase/CreateProjectRatingTopic.dto';
import { UpdateProjectRatingTopicDto } from '@project/core/useCase/RatingTopic/UpdateProjectRatingTopicUseCase/UpdateProjectRatingTopic.dto';

export default interface ProjectRatingTopicRepository {
  getAllRatingTopic(): Promise<RatingTopic[]>;
  findRatingTopicById(topicId: number): Promise<RatingTopic>;
  createRatingTopic(
    createProjectRatingTopicDto: CreateProjectRatingTopicDto,
  ): Promise<RatingTopic>;
  updateRatingTopic(
    topicId: number,
    updateProjectRatingTopicDto: UpdateProjectRatingTopicDto,
  ): Promise<RatingTopic>;
}
