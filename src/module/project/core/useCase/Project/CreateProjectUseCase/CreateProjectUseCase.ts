import Project from '@project/core/entity/Project';
import { CreateProjectDto, CreateProjectDtoSchema } from './CreateProject.dto';
import ProjectRepository from '@project/shared/persistence/repository/ProjectRepository/project.repository';

export default class CreateProject {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(input: CreateProjectDto): Promise<Project> {    
    const project = Project.set(
      input.name,
      input.description,
      input.private,
    );
    
    await this.projectRepository.createProject(project);
    return project;
  }
}
