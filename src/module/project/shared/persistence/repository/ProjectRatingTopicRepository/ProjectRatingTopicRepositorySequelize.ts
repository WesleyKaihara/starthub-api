import { Injectable } from '@nestjs/common';

import Project from '@project/core/entity/Project';
import ProjectModel from '../../model/ProjectModel';
import ProjectRepository from './projectRatingTopic.repository';
import { CreateProjectRatingTopicDto } from '@project/core/useCase/RatingTopic/CreateProjectRatingTopicUseCase/CreateProjectRatingTopic.dto';
import { UpdateProjectRatingTopicDto } from '@project/core/useCase/RatingTopic/UpdateProjectRatingTopicUseCase/UpdateProjectRatingTopic.dto';

@Injectable()
export default class ProjectRatingTopicRepositorySequelize
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
    createProjectRatingTopicDto: CreateProjectRatingTopicDto,
  ): Promise<Project> {
    return ProjectModel.create(createProjectRatingTopicDto as any);
  }

  public async updateRatingTopic(
    id: number,
    updateProjectRatingTopicDto: UpdateProjectRatingTopicDto,
  ): Promise<Project> {
    const [linhasAfetadas] = await ProjectModel.update(
      { ...updateProjectRatingTopicDto },
      { where: { id } },
    );

    if (linhasAfetadas > 0) {
      return await ProjectModel.findByPk(id);
    } else {
      throw new Error(`Unable to find a project type with id ${id}`);
    }
  }
}
