import RatingTopic from '@project/core/entity/RatingTopic';

import ProjectRatingTopicRepository from '@project/shared/persistence/repository/ProjectRatingTopicRepository/projectRatingTopic.repository';
import { CreateProjectRatingTopicDto } from './CreateProjectRatingTopic.dto';

export default class CreateProjectRatingTopic {
  constructor(
    private readonly projectRatingTopicRepository: ProjectRatingTopicRepository,
  ) {}

  async execute(input: CreateProjectRatingTopicDto): Promise<RatingTopic> {
    const ratingTopic = RatingTopic.create(input.name, input.description);
    await this.projectRatingTopicRepository.createRatingTopic(ratingTopic);
    return ratingTopic;
  }
}
