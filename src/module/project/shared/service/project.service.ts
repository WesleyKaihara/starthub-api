import { Injectable } from '@nestjs/common';

import Project from '../../core/entity/Project';
import ProjectRepositorySequelize from '../persistence/repository/ProjectRepository/ProjectRepositorySequelize';
import GetAllProjects from '@project/core/useCase/Project/GetAllProjectsUseCase/GetAllProjectsUseCase';
import FindProjectById from '@project/core/useCase/Project/FindProjectByIdUseCase/FindProjectProjectByIdUseCase';
import CreateProject from '@project/core/useCase/Project/CreateProjectUseCase/CreateProjectUseCase';
import { CreateProjectDto } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';
import { UpdateProjectDto } from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProject.dto';
import UpdateProject from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProjectUseCase';

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

  createProject(createProjectDto: CreateProjectDto): Promise<Project> {
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
