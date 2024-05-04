import Project from '@project/core/entity/Project';

import { ProjectRepository } from '@project/shared/persistence';
import UploadService from '@upload/shared/service/upload.service';

export class GetAllProjects {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly uploadService: UploadService,
  ) {}

  async execute(): Promise<Project[]> {
    const projects = await this.projectRepository.getAllProjects();

    for (const project of projects) {
      const image = await this.uploadService.getFile(
        project.image,
        'starthub-bucket',
      );

      project.image = image;
    }

    return projects;
  }
}
