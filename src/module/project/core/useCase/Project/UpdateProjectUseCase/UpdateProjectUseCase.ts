import ProjectRepository from '@project/shared/persistence/repository/ProjectRepository/project.repository';
import Project from '@project/core/entity/Project';
import { UpdateProjectBody } from './UpdateProject.dto';

export class UpdateProject {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(projectId: number, input: UpdateProjectBody): Promise<Project> {
    const project = Project.update(
      projectId,
      input.name,
      input.description,
      input.private,
    );

    await this.projectRepository.updateProject(projectId, project);
    return project;
  }
}
