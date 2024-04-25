import RatingTopic from '@project/core/entity/RatingTopic';
import { RatingTopicRepository } from '@project/shared/persistence';
import { UpdateRatingTopicBody } from './UpdateRatingTopic.dto';

export class UpdateRatingTopic {
  constructor(private readonly ratingTopicRepository: RatingTopicRepository) { }

  async execute(
    topicId: number,
    input: UpdateRatingTopicBody,
  ): Promise<RatingTopic> {
    const ratingTopic = RatingTopic.create(input.name, input.description);
    await this.ratingTopicRepository.updateRatingTopic(topicId, ratingTopic);
    return ratingTopic;
  }
}
