import RatingTopic from '@project/core/entity/RatingTopic';
import RatingTopicRepository from '@project/shared/persistence/repository/RatingTopicRepository/RatingTopic.repository';
import { UpdateRatingTopicDto } from './UpdateRatingTopic.dto';

export default class UpdateRatingTopic {
  constructor(private readonly ratingTopicRepository: RatingTopicRepository) {}

  async execute(
    topicId: number,
    input: UpdateRatingTopicDto,
  ): Promise<RatingTopic> {
    const ratingTopic = RatingTopic.create(input.name, input.description);
    await this.ratingTopicRepository.updateRatingTopic(topicId, ratingTopic);
    return ratingTopic;
  }
}
