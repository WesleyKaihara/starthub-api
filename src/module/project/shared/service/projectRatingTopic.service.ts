import { Injectable } from '@nestjs/common';

import RatingTopic from '@project/core/entity/RatingTopic';
import ProjectRatingTopicRepositorySequelize from '../persistence/repository/ProjectRatingTopicRepository/ProjectRatingTopicRepositorySequelize';
import GetAllProjectRatingTopics from '@project/core/useCase/RatingTopic/GetAllProjectRatingTopicsUseCase/GetAllProjectRatingTopicsUseCase';
import FindRatingTopicById from '@project/core/useCase/RatingTopic/FindRatingTopicByIdUseCase/FindRatingTopicByIdUseCase';
import { CreateProjectRatingTopicDto } from '@project/core/useCase/RatingTopic/CreateProjectRatingTopicUseCase/CreateProjectRatingTopic.dto';
import CreateProjectRatingTopic from '@project/core/useCase/RatingTopic/CreateProjectRatingTopicUseCase/CreateProjectRatingTopicUseCase';
import UpdateProjectRatingTopic from '@project/core/useCase/RatingTopic/UpdateProjectRatingTopicUseCase/UpdateProjectRatingTopicUseCase';
import { UpdateProjectRatingTopicDto } from '@project/core/useCase/RatingTopic/UpdateProjectRatingTopicUseCase/UpdateProjectRatingTopic.dto';

@Injectable()
export default class ProjectRatingTopicService {
  constructor(
    private readonly projectRepository: ProjectRatingTopicRepositorySequelize,
  ) {}

  getAllProjects(): Promise<RatingTopic[]> {
    const getAllProjects = new GetAllProjectRatingTopics(
      this.projectRepository,
    );
    return getAllProjects.execute();
  }

  findProjectById(projectId: number): Promise<RatingTopic> {
    const findProjectById = new FindRatingTopicById(this.projectRepository);
    return findProjectById.execute(projectId);
  }

  async createProject(
    createProjectDto: CreateProjectRatingTopicDto,
  ): Promise<RatingTopic> {
    const createProject = new CreateProjectRatingTopic(this.projectRepository);
    return createProject.execute(createProjectDto);
  }

  updateProject(
    topicId: number,
    updateProjectRatingTopicDto: UpdateProjectRatingTopicDto,
  ): Promise<RatingTopic> {
    const updateProject = new UpdateProjectRatingTopic(this.projectRepository);
    return updateProject.execute(topicId, updateProjectRatingTopicDto);
  }
}
