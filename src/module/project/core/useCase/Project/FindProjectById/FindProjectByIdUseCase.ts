import { NotFoundException } from '@nestjs/common';
import Project from '@project/core/entity/Project';

import { ProjectRepository } from '@project/shared/persistence';
import UploadService from '@upload/shared/service/upload.service';

export class FindProjectById {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly uploadService: UploadService,
  ) {}

  async execute(projectId: number, userId: number): Promise<Project> {
    const project = await this.projectRepository.findProjectById(projectId);

    if (!project.ative && project.userId !== userId) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    if (project.image) {
      const image = await this.uploadService.getFile(
        project.image,
        'starthub-bucket',
      );

      project.image = image;
    }

    return project;
  }
}
