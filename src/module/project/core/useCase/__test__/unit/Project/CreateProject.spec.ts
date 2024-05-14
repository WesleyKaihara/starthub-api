import { CreateProjectBody } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';

import { CreateProject } from '@project/core/useCase';
import {
  ProjectRepository,
  ProjectRepositoryInMemory,
} from '@project/shared/persistence';
import UploadService from '@upload/shared/service/upload.service';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

import * as awsSdk from '@aws-sdk/client-s3';
jest.mock('@aws-sdk/client-s3');

describe('CreateProject', () => {
  let createProject: CreateProject;
  let projectRepository: ProjectRepository;
  let uploadService: UploadService;
  let configService: ConfigService;

  beforeEach(() => {
    projectRepository = new ProjectRepositoryInMemory();
    configService = new ConfigService();
    uploadService = new UploadService(configService);
    createProject = new CreateProject(projectRepository, uploadService);
  });

  it('should create a project', async () => {
    const input: CreateProjectBody = {
      name: 'Test Project',
      description: 'This is a test project.',
      private: false,
      userId: 1,
    };

    const file: Express.Multer.File = {
      fieldname: 'fieldname',
      originalname: 'originalname',
      encoding: 'encoding',
      mimetype: 'mimetype',
      size: 1234,
      destination: 'destination',
      filename: 'filename',
      path: 'path',
      buffer: Buffer.from('content'),
      stream: Readable.from(['content']),
    };

    (awsSdk.S3Client.prototype.send as jest.Mock).mockResolvedValue({});

    const project = await createProject.execute(input, file);

    expect(project).toBeDefined();
    expect(project.name).toBe('Test Project');
    expect(project.description).toBe('This is a test project.');
    expect(project.private).toBe(false);
  });

  it('should throw error if project name is too short', async () => {
    const input: CreateProjectBody = {
      name: 'Test',
      description: 'This is a test project.',
      private: false,
      userId: 1,
    };

    const file: Express.Multer.File = {
      fieldname: 'fieldname',
      originalname: 'originalname',
      encoding: 'encoding',
      mimetype: 'mimetype',
      size: 1234,
      destination: 'destination',
      filename: 'filename',
      path: 'path',
      buffer: Buffer.from('content'),
      stream: Readable.from(['content']),
    };

    await expect(createProject.execute(input, file)).rejects.toThrow(
      /Project Name must have at least 5/,
    );
  });

  it('should throw error if project description is too short', async () => {
    const input: CreateProjectBody = {
      name: 'Test Project',
      description: 'Test',
      private: false,
      userId: 1,
    };

    const file: Express.Multer.File = {
      fieldname: 'fieldname',
      originalname: 'originalname',
      encoding: 'encoding',
      mimetype: 'mimetype',
      size: 1234,
      destination: 'destination',
      filename: 'filename',
      path: 'path',
      buffer: Buffer.from('content'),
      stream: Readable.from(['content']),
    };

    await expect(createProject.execute(input, file)).rejects.toThrow(
      /Project Description must have at least 10/,
    );
  });
});
