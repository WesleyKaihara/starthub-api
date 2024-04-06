import { Injectable } from '@nestjs/common';

import Project from '../../core/entity/Project';
import CreateProject from '@project/core/useCase/CreateProjectUseCase/CreateProjectUseCase';

import { CreateProjectDto } from '@project/core/useCase/CreateProjectUseCase/CreateProject.dto';

import ProjectRepositorySequelize from '@project/shared/persistence/repository/ProjectRepositorySequelize';
import { UpdateProjectDto } from '@project/core/useCase/UpdateProjectUseCase/UpdateProject.dto';
import UpdateProject from '@project/core/useCase/UpdateProjectUseCase/UpdateProjectUseCase';
import FindProjectById from '@project/core/useCase/FindProjectById/FindProjectProjectByIdUseCase';
import GetAllProjects from '@project/core/useCase/GetAllProjectsUseCase/GetAllProjectsUseCase';

@Injectable()
export default class ProjectService {
  constructor(private readonly projectRepository: ProjectRepositorySequelize) {}

  getAllProjects(): Promise<Project[]> {
    const getAllProjects = new GetAllProjects(this.projectRepository);
    return getAllProjects.execute();
  }

  findProjectById(projectId: number): Promise<Project> {
    const findProjectById = new FindProjectById(this.projectRepository);
    return findProjectById.execute(projectId);
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const createProject = new CreateProject(this.projectRepository);
    return createProject.execute(createProjectDto);
  }

  updateProject(
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const updateProject = new UpdateProject(this.projectRepository);
    return updateProject.execute(projectId, updateProjectDto);
  }
}
