import Project from '@project/core/entity/Project';

import { ProjectRepository } from '@project/shared/persistence';
import UploadService from '@upload/shared/service/upload.service';

export class FindProjectById {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly uploadService: UploadService,
  ) {}

  async execute(projectId: number): Promise<Project> {
    const project = await this.projectRepository.findProjectById(projectId);
    console.log(project);
    const image = await this.uploadService.getFile(
      project.image,
      'starthub-bucket',
    );

    project.image = image;

    return project;
  }
}
