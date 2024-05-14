import Project from '@project/core/entity/Project';

import { ProjectRepository } from '@project/shared/persistence';
import UploadService from '@upload/shared/service/upload.service';

export class GetAllUserProjects {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly uploadService: UploadService,
  ) {}

  async execute(userId: number): Promise<Project[]> {
    const projects = await this.projectRepository.getAllUserProjects(userId);

    for (const project of projects) {
      if (project.image) {
        const image = await this.uploadService.getFile(
          project.image,
          'starthub-bucket',
        );

        project.image = image;
      }
    }

    return projects;
  }
}
