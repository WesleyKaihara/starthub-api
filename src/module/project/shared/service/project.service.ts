import { Injectable } from '@nestjs/common';

import Project from '../../core/entity/Project';
import { CreateProjectBody } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';
import { UpdateProjectBody } from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProject.dto';
import {
  CreateProject,
  FindProjectById,
  GetAllProjects,
  GetAllUserProjects,
  UpdateProject,
} from '@project/core/useCase';
import { ProjectRepositorySequelize } from '../persistence';
import UploadService from '@upload/shared/service/upload.service';

@Injectable()
export default class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepositorySequelize,
    private readonly uploadService: UploadService,
  ) {}

  getAllProjects(): Promise<Project[]> {
    const getAllProjects = new GetAllProjects(
      this.projectRepository,
      this.uploadService,
    );
    return getAllProjects.execute();
  }

  getAllUserProjects(userId: number): Promise<Project[]> {
    const getAllProjects = new GetAllUserProjects(
      this.projectRepository,
      this.uploadService,
    );
    return getAllProjects.execute(userId);
  }

  findProjectById(projectId: number): Promise<Project> {
    const findProjectById = new FindProjectById(
      this.projectRepository,
      this.uploadService,
    );
    return findProjectById.execute(projectId);
  }

  createProject(
    input: CreateProjectBody,
    file: Express.Multer.File,
  ): Promise<Project> {
    const createProject = new CreateProject(
      this.projectRepository,
      this.uploadService,
    );
    return createProject.execute(input, file);
  }

  updateProject(projectId: number, input: UpdateProjectBody): Promise<Project> {
    const updateProject = new UpdateProject(this.projectRepository);
    return updateProject.execute(projectId, input);
  }
}
