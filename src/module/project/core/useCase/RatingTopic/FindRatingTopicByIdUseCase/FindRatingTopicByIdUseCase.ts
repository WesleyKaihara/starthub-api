import RatingTopic from '@project/core/entity/RatingTopic';
import {RatingTopicRepository} from '@project/shared/persistence';

export class FindRatingTopicById {
  constructor(private readonly ratingTopicRepository: RatingTopicRepository) {}

  async execute(topicId: number): Promise<RatingTopic> {
    const ratingTopic =
      await this.ratingTopicRepository.findRatingTopicById(topicId);
    return ratingTopic;
  }
}
