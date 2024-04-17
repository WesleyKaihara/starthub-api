import * as request from 'supertest';

import ProjectRepositorySequelize from '@project/shared/persistence/repository/ProjectRepository/ProjectRepositorySequelize';
import InMemoryProjectRepository from '@project/shared/persistence/repository/ProjectRepository/ProjectRepositoryInMemory';

import { AppModule } from '@src/app.module';
import { TestingModule, Test } from '@nestjs/testing';
import ProjectService from '@project/shared/service/project.service';
import Project from '@project/core/entity/Project';

describe('ProjectController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ProjectRepositorySequelize)
      .useClass(InMemoryProjectRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/project (GET)', () => {
    return request(app.getHttpServer())
      .get('/project')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it('should return 500 error when an error occurs while listing projects', () => {
    jest
      .spyOn(app.get(ProjectService), 'getAllProjects')
      .mockRejectedValueOnce(new Error('Failed to fetch projects'));

    return request(app.getHttpServer())
      .get('/project')
      .expect(500)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Failed to fetch projects',
        );
      });
  });

  it('/project/:projectId (GET)', () => {
    const project = Project.restore(1, "Project 1", "Description 1", false);

    jest
      .spyOn(app.get(ProjectService), 'findProjectById')
      .mockResolvedValue(project);

    return request(app.getHttpServer())
      .get('/project/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('private');
      })
  });

  it('should return 400 error when project id is not a number', () => {
    return request(app.getHttpServer())
      .get('/project/abc')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });

  it('should return 400 error when an error occurs while finding project by id', () => {
    jest
      .spyOn(app.get(ProjectService), 'findProjectById')
      .mockRejectedValueOnce(new Error('Failed to find project'));

    return request(app.getHttpServer())
      .get('/project/1')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Failed to find project',
        );
      });
  });

  it('/project (POST)', () => {
    return request(app.getHttpServer())
      .post('/project')
      .send({
        name: 'Test Project',
        description: 'Test Description',
        private: true,
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.name).toBe('Test Project');
        expect(response.body.description).toBe('Test Description');
        expect(response.body.private).toBe(true);
      });
  });

  it('should return error when creating project with invalid name length', () => {
    return request(app.getHttpServer())
      .post('/project')
      .send({ name: 'Test', description: 'Valid Description', private: true })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
          'Project Name must have at least 5 characters',
        );
      });
  });

  it('should return error when creating project with invalid description length', () => {
    return request(app.getHttpServer())
      .post('/project')
      .send({ name: 'Valid Name', description: 'Test', private: true })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
          'Project Description must have at least 10 characters',
        );
      });
  });

  it('/project/:projectId (PUT)', () => {
    return request(app.getHttpServer())
      .put('/project/1')
      .send({
        name: 'Updated Project',
        description: 'Updated Description',
        private: false,
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Updated Project');
        expect(response.body.description).toBe('Updated Description');
        expect(response.body.private).toBe(false);
      });
  });

  it('should return error when updating project with invalid name length', () => {
    return request(app.getHttpServer())
      .put('/project/1')
      .send({
        name: 'test',
        description: 'Valid Description',
        private: false,
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'Project Name must have at least 5 characters',
        );
      });
  });

  it('should return error when updating project with invalid description length', () => {
    return request(app.getHttpServer())
      .put('/project/1')
      .send({ name: 'Valid Name', description: 'Test', private: false })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'Project Description must have at least 10 characters',
        );
      });
  });
});
