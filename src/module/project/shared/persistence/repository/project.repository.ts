import Project from '@project/core/entity/project.entity';
import { CreateProjectDto } from '@project/http/dto/project/create-project.dto';
import { UpdateProjectDto } from '@project/http/dto/project/update-project.dto';

export default interface ProjectRepository {
  getAllProjects(): Promise<Project[]>;
  findProjectById(projectId: number): Promise<Project>;
  createProject(createProjectDto: CreateProjectDto): Promise<Project>;
  updateProject(
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project>;
}
