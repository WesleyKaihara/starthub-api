import ProjectRepository from '@project/shared/persistence/repository/project.repository';
import { UpdateProjectDto } from './UpdateProject.dto';
import Project from '@project/core/entity/Project';

export default class CreateProject {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(input: UpdateProjectDto): Promise<Project> {
    const project = Project.update(
      input.name,
      input.description,
      input.private,
    );
    await this.projectRepository.createProject(project);
    return project;
  }
}
