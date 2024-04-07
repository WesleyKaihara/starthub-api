import RatingTopic from '@project/core/entity/RatingTopic';
import RatingTopicRepository from '@project/shared/persistence/repository/RatingTopicRepository/RatingTopic.repository';

export default class GetAllRatingTopics {
  constructor(private readonly ratingTopicRepository: RatingTopicRepository) {}

  async execute(): Promise<RatingTopic[]> {
    const ratingTopics = await this.ratingTopicRepository.getAllRatingTopic();
    return ratingTopics;
  }
}
