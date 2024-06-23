import Project from '@project/core/entity/Project';

import { ProjectRepository } from '@project/shared/persistence';

export class ToggleProjectStatus {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(projectId: number, userId: number): Promise<Project> {
    const userProject = await this.projectRepository.findProjectById(projectId);

    if (!userProject) {
      throw new Error(`Project ${projectId} not found`);
    }

    if (userProject.userId !== userId) {
      throw new Error(`No permission to change project status ${projectId}`);
    }

    const project = Project.update(
      userProject.id,
      userProject.name,
      userProject.description,
      !userProject.ative,
      userProject.userId,
      userProject.image,
    );

    await this.projectRepository.updateProject(projectId, project);
    return project;
  }
}
