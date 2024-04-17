import Project from '@project/core/entity/Project';

import { ProjectRepository } from '@project/shared/persistence';

export class FindProjectById {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(projectId: number): Promise<Project> {
    const project = await this.projectRepository.findProjectById(projectId);
    return project;
  }
}
