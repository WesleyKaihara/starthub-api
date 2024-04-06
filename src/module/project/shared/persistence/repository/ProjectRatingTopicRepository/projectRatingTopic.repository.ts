import RatingTopic from '@project/core/entity/RatingTopic';

import { CreateProjectRatingTopicDto } from '@project/core/useCase/CreateProjectRatingTopicUseCase/CreateProjectRatingTopic.dto';
import { UpdateProjectRatingTopicDto } from '@project/core/useCase/UpdateProjectRatingTopicUseCase/UpdateProjectRatingTopic.dto';

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
