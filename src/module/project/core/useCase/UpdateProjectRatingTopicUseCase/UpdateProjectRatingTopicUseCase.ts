import RatingTopic from '@project/core/entity/RatingTopic';

import { UpdateProjectRatingTopicDto } from './UpdateProjectRatingTopic.dto';
import ProjectRatingTopicRepository from '@project/shared/persistence/repository/ProjectRatingTopicRepository/projectRatingTopic.repository';

export default class UpdateProject {
  constructor(
    private readonly projectRepository: ProjectRatingTopicRepository,
  ) {}

  async execute(
    topicId: number,
    input: UpdateProjectRatingTopicDto,
  ): Promise<RatingTopic> {
    const ratingTopic = RatingTopic.create(input.name, input.description);
    await this.projectRepository.updateRatingTopic(topicId, ratingTopic);
    return ratingTopic;
  }
}
