import RatingTopic from '@project/core/entity/RatingTopic';
import { RatingTopicRepository } from './RatingTopic.repository';
import { UpdateRatingTopicBody } from '@project/core/useCase/RatingTopic/UpdateRatingTopicUseCase/UpdateRatingTopic.dto';

export class RatingTopicRepositoryInMemory implements RatingTopicRepository {
  private ratingTopics: RatingTopic[];
  private nextId: number;

  constructor() {
    this.ratingTopics = [];
    this.nextId = 1;
  }

  async getAllRatingTopics(): Promise<RatingTopic[]> {
    return this.ratingTopics;
  }

  async findRatingTopicById(
    ratingTopicId: number,
  ): Promise<RatingTopic> {
    const ratingTopic = this.ratingTopics.find(
      (ratingTopic) => ratingTopic.id === ratingTopicId,
    )
    if (!ratingTopic) {
      throw new Error(`Rating Topic with id ${ratingTopicId} not found`);
    }
    return ratingTopic;
  }

  async createRatingTopic(createRatingTopicDto: any): Promise<RatingTopic> {
    const ratingTopic = RatingTopic.create(
      createRatingTopicDto.name,
      createRatingTopicDto.description,
    );
    ratingTopic.id = this.nextId++;
    this.ratingTopics.push(ratingTopic);
    return ratingTopic;
  }

  async updateRatingTopic(
    ratingTopicId: number,
    updateRatingTopicDto: UpdateRatingTopicBody,
  ): Promise<RatingTopic | null> {
    const ratingTopicIndex = this.ratingTopics.findIndex(
      (ratingTopic) => ratingTopic.id === ratingTopicId,
    );
    if (ratingTopicIndex !== -1) {
      const updatedRatingTopic = RatingTopic.restore(
        ratingTopicId,
        updateRatingTopicDto.name,
        updateRatingTopicDto.description,
      );
      updatedRatingTopic.id = ratingTopicId;
      this.ratingTopics[ratingTopicIndex] = updatedRatingTopic;
      return updatedRatingTopic;
    }
    return null;
  }
}