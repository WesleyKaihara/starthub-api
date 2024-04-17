import Project from '@project/core/entity/Project';
import { UpdateProjectBody } from './UpdateProject.dto';

import { ProjectRepository } from '@project/shared/persistence';

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
