import { Injectable } from '@nestjs/common';

import RatingTopicModel from '../../model/RatingTopicModel';
import RatingTopicRepository from './RatingTopic.repository';
import { CreateRatingTopicDto } from '@project/core/useCase/RatingTopic/CreateRatingTopicUseCase/CreateRatingTopic.dto';
import RatingTopic from '@project/core/entity/RatingTopic';
import { UpdateRatingTopicBody } from '@project/core/useCase/RatingTopic/UpdateRatingTopicUseCase/UpdateRatingTopic.dto';

@Injectable()
export default class RatingTopicRepositorySequelize
  implements RatingTopicRepository
{
  public getAllRatingTopic(): Promise<RatingTopic[]> {
    return RatingTopicModel.findAll()
      .then((ratingTopics) => {
        return ratingTopics as RatingTopic[];
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  public async findRatingTopicById(id: number): Promise<RatingTopic> {
    return await RatingTopicModel.findOne({
      where: { id },
    });
  }

  public createRatingTopic(
    createRatingTopicDto: CreateRatingTopicDto,
  ): Promise<RatingTopic> {
    return RatingTopicModel.create(createRatingTopicDto as any);
  }

  public async updateRatingTopic(
    id: number,
    updateRatingTopicBody: UpdateRatingTopicBody,
  ): Promise<RatingTopic> {
    const [rowsAffected] = await RatingTopicModel.update(
      { ...updateRatingTopicBody },
      { where: { id } },
    );

    if (rowsAffected > 0) {
      return await RatingTopicModel.findByPk(id);
    } else {
      throw new Error(`Unable to find a rating topic type with id ${id}`);
    }
  }
}
