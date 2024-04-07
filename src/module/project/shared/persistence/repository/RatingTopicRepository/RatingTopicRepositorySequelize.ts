import { Injectable } from '@nestjs/common';

import Project from '@project/core/entity/Project';
import ProjectModel from '../../model/ProjectModel';
import ProjectRepository from './RatingTopic.repository';
import { CreateRatingTopicDto } from '@project/core/useCase/RatingTopic/CreateRatingTopicUseCase/CreateRatingTopic.dto';
import { UpdateRatingTopicDto } from '@project/core/useCase/RatingTopic/UpdateRatingTopicUseCase/UpdateRatingTopic.dto';

@Injectable()
export default class RatingTopicRepositorySequelize
  implements ProjectRepository
{
  public getAllRatingTopic(): Promise<Project[]> {
    return ProjectModel.findAll()
      .then((ratingTopics) => {
        return ratingTopics as Project[];
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  public async findRatingTopicById(id: number): Promise<Project> {
    return await ProjectModel.findOne({
      where: { id },
    });
  }

  public createRatingTopic(
    createRatingTopicDto: CreateRatingTopicDto,
  ): Promise<Project> {
    return ProjectModel.create(createRatingTopicDto as any);
  }

  public async updateRatingTopic(
    id: number,
    updateRatingTopicDto: UpdateRatingTopicDto,
  ): Promise<Project> {
    const [linhasAfetadas] = await ProjectModel.update(
      { ...updateRatingTopicDto },
      { where: { id } },
    );

    if (linhasAfetadas > 0) {
      return await ProjectModel.findByPk(id);
    } else {
      throw new Error(`Unable to find a rating topic type with id ${id}`);
    }
  }
}
