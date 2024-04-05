import { Injectable } from '@nestjs/common';

import Project from '../entity/Project';
import { UpdateProjectDto } from '@project/http/dto/project/update-project.dto';
import { CreateProjectDto } from '@project/http/dto/project/create-project.dto';
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
    return this.projectRepository.createProject(createProjectDto);
  }

  updateProject(
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectRepository.updateProject(projectId, updateProjectDto);
  }
}
