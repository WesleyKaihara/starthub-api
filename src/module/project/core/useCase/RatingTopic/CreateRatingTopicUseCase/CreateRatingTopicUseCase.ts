import RatingTopic from '@project/core/entity/RatingTopic';

import { CreateRatingTopicBody } from './CreateRatingTopic.dto';
import { RatingTopicRepository } from '@project/shared/persistence';

export class CreateRatingTopic {
  constructor(private readonly ratingTopicRepository: RatingTopicRepository) {}

  async execute(input: CreateRatingTopicBody): Promise<RatingTopic> {
    const ratingTopic = RatingTopic.create(input.name, input.description);
    await this.ratingTopicRepository.createRatingTopic(ratingTopic);
    return ratingTopic;
  }
}
