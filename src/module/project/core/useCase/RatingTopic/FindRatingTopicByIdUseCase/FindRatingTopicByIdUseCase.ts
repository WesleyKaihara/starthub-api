import RatingTopic from '@project/core/entity/RatingTopic';
import ProjectRatingTopicRepository from '@project/shared/persistence/repository/ProjectRatingTopicRepository/projectRatingTopic.repository';

export default class FindRatingTopicById {
  constructor(
    private readonly projectRatingTopicRepository: ProjectRatingTopicRepository,
  ) {}

  async execute(topicId: number): Promise<RatingTopic> {
    const ratingTopic =
      await this.projectRatingTopicRepository.findRatingTopicById(topicId);
    return ratingTopic;
  }
}
