import RatingTopic from '@project/core/entity/RatingTopic';
import ProjectRatingTopicRepository from '@project/shared/persistence/repository/ProjectRatingTopicRepository/projectRatingTopic.repository';

export default class GetAllProjectRatingTopics {
  constructor(
    private readonly projectRatingTopicRepository: ProjectRatingTopicRepository,
  ) {}

  async execute(): Promise<RatingTopic[]> {
    const ratingTopics =
      await this.projectRatingTopicRepository.getAllRatingTopic();
    return ratingTopics;
  }
}
