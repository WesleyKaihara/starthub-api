import {
  ProjectRepository,
  ProjectRepositoryInMemory,
} from '@project/shared/persistence';
import ProjectBuilder from '../../ProjectBuilder';
import { FindProjectById } from '@project/core/useCase';
import UploadService from '@upload/shared/service/upload.service';
import { ConfigService } from '@nestjs/config';

describe('FindProjectById', () => {
  let findProjectById: FindProjectById;
  let projectRepository: ProjectRepository;
  let uploadService: UploadService;
  let configService: ConfigService;

  beforeEach(() => {
    projectRepository = new ProjectRepositoryInMemory();
    configService = new ConfigService();
    uploadService = new UploadService(configService);
    findProjectById = new FindProjectById(projectRepository, uploadService);
  });

  it('should find project by id', async () => {
    const projectId = 1;
    const userId = 1;

    const expectedProject = new ProjectBuilder()
      .withName('Project 1')
      .withUserId(1)
      .withDescription('Description 1')
      .withAtive(false)
      .build();
    await projectRepository.createProject(expectedProject);

    const project = await findProjectById.execute(projectId, userId);

    expect(project).toEqual(expectedProject);
  });

  it('should return exeption if project is not found', async () => {
    const projectId = 999;
    const userId = 1;

    expect(findProjectById.execute(projectId, userId)).rejects.toThrow(
      `Project with id ${projectId} not found`,
    );
  });
});
