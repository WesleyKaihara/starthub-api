import { Injectable } from '@nestjs/common';

import RatingTopicModel from '../../model/RatingTopicModel';
import { RatingTopicRepository } from './RatingTopic.repository';
import RatingTopic from '@project/core/entity/RatingTopic';
import { UpdateRatingTopicBody, CreateRatingTopicBody } from '@project/core/useCase';

@Injectable()
export class RatingTopicRepositorySequelize
  implements RatingTopicRepository {
  async getAllRatingTopics(): Promise<RatingTopic[]> {
    const ratingTopics = await RatingTopicModel.findAll();

    return ratingTopics.map((project) =>
      RatingTopic.restore(project.id, project.name, project.description),
    );
  }

  public async findRatingTopicById(id: number): Promise<RatingTopic> {
    const ratingTopic = await RatingTopicModel.findOne({ where: { id } });
    if (!ratingTopic) {
      throw new Error(`Rating Topic with id ${id} not found`);
    }
    return RatingTopic.restore(
      ratingTopic.id,
      ratingTopic.name,
      ratingTopic.description,
    );
  }

  async createRatingTopic(input: CreateRatingTopicBody): Promise<RatingTopic> {
    const ratingTopic: RatingTopicModel = await RatingTopicModel.create({
      name: input.name,
      description: input.description,
    });

    return RatingTopic.restore(
      ratingTopic.id,
      ratingTopic.name,
      ratingTopic.description,
    );
  }

  public async updateRatingTopic(
    id: number,
    input: UpdateRatingTopicBody,
  ): Promise<RatingTopic> {
    const [rowsAffected] = await RatingTopicModel.update(
      { ...input },
      { where: { id } },
    );

    if (rowsAffected > 0) {
      const ratingTopic = await RatingTopicModel.findByPk(id);
      if (!ratingTopic) {
        throw new Error(`Rating Topic with id ${id} not found after update`);
      }
      return RatingTopic.restore(
        ratingTopic.id,
        ratingTopic.name,
        ratingTopic.description,
      );
    } else {
      throw new Error(`Unable to update rating topic with id ${id}`);
    }
  }
}
