import Project from '@project/core/entity/Project';
import { UpdateProjectDto } from '@project/core/dto/project/update-project.dto';
import { CreateProjectDto } from '@project/core/useCase/CreateProjectUseCase/CreateProject.dto';

export default interface ProjectRepository {
  getAllProjects(): Promise<Project[]>;
  findProjectById(projectId: number): Promise<Project>;
  createProject(createProjectDto: CreateProjectDto): Promise<Project>;
  updateProject(
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project>;
}
