import ProjectRepository from '@project/shared/persistence/repository/ProjectRepository/project.repository';
import { UpdateProjectDto } from './UpdateProject.dto';
import Project from '@project/core/entity/Project';

export default class UpdateProject {
  constructor(
    private readonly projectRatingTopicRepository: ProjectRepository,
  ) {}

  async execute(projectId: number, input: UpdateProjectDto): Promise<Project> {
    const project = Project.update(
      input.name,
      input.description,
      input.private,
    );
    await this.projectRatingTopicRepository.updateProject(projectId, project);
    return project;
  }
}
