import Project from '@project/core/entity/Project';
import { CreateProjectBody } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';
import { UpdateProjectBody } from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProject.dto';

export interface ProjectRepository {
  getAllProjects(): Promise<Project[]>;
  findProjectById(projectId: number): Promise<Project>;
  getAllUserProjects(userId: number): Promise<Project[]>;
  createProject(createProjectDto: CreateProjectBody): Promise<Project>;
  updateProject(
    projectId: number,
    updateProjectDto: UpdateProjectBody,
  ): Promise<Project>;
}
