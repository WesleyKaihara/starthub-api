import Project from '@project/core/entity/Project';
import ProjectRepository from '@project/shared/persistence/repository/project.repository';

export default class GetAllProjects {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(): Promise<Project[]> {
    const projects = await this.projectRepository.getAllProjects();
    return projects;
  }
}
