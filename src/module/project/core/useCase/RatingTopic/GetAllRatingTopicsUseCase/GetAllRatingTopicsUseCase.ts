import RatingTopic from '@project/core/entity/RatingTopic';
import { RatingTopicRepository } from '@project/shared/persistence';

export class GetAllRatingTopics {
  constructor(private readonly ratingTopicRepository: RatingTopicRepository) {}

  async execute(): Promise<RatingTopic[]> {
    const ratingTopics = await this.ratingTopicRepository.getAllRatingTopics();
    return ratingTopics;
  }
}
