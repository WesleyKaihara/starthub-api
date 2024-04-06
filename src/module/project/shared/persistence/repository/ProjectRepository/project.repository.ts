import Project from '@project/core/entity/Project';

import { CreateProjectDto } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';
import { UpdateProjectDto } from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProject.dto';

export default interface ProjectRepository {
  getAllProjects(): Promise<Project[]>;
  findProjectById(projectId: number): Promise<Project>;
  createProject(createProjectDto: CreateProjectDto): Promise<Project>;
  updateProject(
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project>;
}
