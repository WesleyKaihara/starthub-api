import { Injectable } from '@nestjs/common';

import Project from '../../core/entity/Project';
import CreateProject from '@project/core/useCase/CreateProjectUseCase/CreateProjectUseCase';

import { UpdateProjectDto } from '@project/core/dto/project/update-project.dto';
import { CreateProjectDto } from '@project/core/useCase/CreateProjectUseCase/CreateProject.dto';

import ProjectRepositorySequelize from '@project/shared/persistence/repository/ProjectRepositorySequelize';

@Injectable()
export default class ProjectService {
  constructor(private readonly projectRepository: ProjectRepositorySequelize) {}

  getAllProjects(): Promise<Project[]> {
    return this.projectRepository.getAllProjects();
  }

  findProjectById(projectId: number): Promise<Project> {
    return this.projectRepository.findProjectById(projectId);
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const createProject = new CreateProject(this.projectRepository);
    return createProject.execute(createProjectDto);
  }

  updateProject(
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectRepository.updateProject(projectId, updateProjectDto);
  }
}
