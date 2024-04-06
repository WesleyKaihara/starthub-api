import Project from '@project/core/entity/Project';
import ProjectRepository from '@project/shared/persistence/repository/ProjectRepository/project.repository';

export default class FindProjectById {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(projectId: number): Promise<Project> {
    const project = await this.projectRepository.findProjectById(projectId);
    return project;
  }
}
