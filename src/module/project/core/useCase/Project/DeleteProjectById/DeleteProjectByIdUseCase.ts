import { ProjectRepository } from '@project/shared/persistence';

export class DeleteProjectById {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(projectId: number) {
    await this.projectRepository.deleteProjectById(projectId);
  }
}
