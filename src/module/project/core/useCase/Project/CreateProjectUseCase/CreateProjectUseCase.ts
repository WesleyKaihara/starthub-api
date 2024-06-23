import Project from '@project/core/entity/Project';
import { CreateProjectBody } from './CreateProject.dto';

import { ProjectRepository } from '@project/shared/persistence';
import UploadService from '@upload/shared/service/upload.service';

export class CreateProject {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly uploadService: UploadService,
  ) {}

  async execute(
    input: CreateProjectBody,
    file: Express.Multer.File,
  ): Promise<Project> {
    const project = Project.create(
      input.name,
      input.description,
      input.ative,
      input.userId,
    );

    const fileName = `${Date.now()}_${file.originalname}`;

    await this.uploadService.upload(fileName, file.buffer, 'starthub-bucket');

    project.image = fileName;

    await this.projectRepository.createProject(project);
    return project;
  }
}
