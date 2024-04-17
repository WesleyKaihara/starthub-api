import Project from '@project/core/entity/Project';
import ProjectRepository from '@project/shared/persistence/repository/ProjectRepository/project.repository';
import { CreateProjectBody } from './CreateProject.dto';

export class CreateProject {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(input: CreateProjectBody): Promise<Project> {
    const project = Project.create(
      input.name,
      input.description,
      input.private,
    );

    await this.projectRepository.createProject(project);
    return project;
  }
}
