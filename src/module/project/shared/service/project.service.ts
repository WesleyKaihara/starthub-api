import { Injectable } from '@nestjs/common';

import Project from '../../core/entity/Project';
import ProjectRepositorySequelize from '../persistence/repository/ProjectRepository/ProjectRepositorySequelize';
import { CreateProjectBody } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';
import { UpdateProjectBody } from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProject.dto';
import { CreateProject, FindProjectById, GetAllProjects, UpdateProject } from '@project/core/useCase';

@Injectable()
export default class ProjectService {
  constructor(private readonly projectRepository: ProjectRepositorySequelize) { }

  getAllProjects(): Promise<Project[]> {
    const getAllProjects = new GetAllProjects(this.projectRepository);
    return getAllProjects.execute();
  }

  findProjectById(projectId: number): Promise<Project> {
    const findProjectById = new FindProjectById(this.projectRepository);
    return findProjectById.execute(projectId);
  }

  createProject(createProjectDto: CreateProjectBody): Promise<Project> {
    const createProject = new CreateProject(this.projectRepository);
    return createProject.execute(createProjectDto);
  }

  updateProject(
    projectId: number,
    updateProjectDto: UpdateProjectBody,
  ): Promise<Project> {
    const updateProject = new UpdateProject(this.projectRepository);
    return updateProject.execute(projectId, updateProjectDto);
  }
}
