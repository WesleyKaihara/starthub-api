import * as request from 'supertest';

import { AppModule } from '@src/app.module';
import { TestingModule, Test } from '@nestjs/testing';
import DiscussionService from '@discussion/shared/service/discussion.service';
import Discussion from '@discussion/core/entity/Discussion';

import { DiscussionRepositoryInMemory, DiscussionRepositorySequelize } from '@discussion/shared/persistence';

describe('DiscussionController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DiscussionRepositorySequelize)
      .useClass(DiscussionRepositoryInMemory)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/discussion (GET)', () => {
    return request(app.getHttpServer())
      .get('/discussion')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it('should return 500 error when an error occurs while listing discussions', () => {
    jest
      .spyOn(app.get(DiscussionService), 'getDiscussions')
      .mockRejectedValueOnce(new Error('Failed to fetch discussions'));

    return request(app.getHttpServer())
      .get('/discussion')
      .expect(500)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Failed to fetch discussions',
        );
      });
  });

  it('/discussion/:discussionId (GET)', () => {
    return request(app.getHttpServer())
      .get('/discussion/8')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Discussion with id 8 not found',
        );
      })
  });

  it('/discussion/:discussionId (GET)', () => {
    const discussion = Discussion.restore(1, "Discussion title", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");

    jest
      .spyOn(app.get(DiscussionService), 'findDiscussionById')
      .mockResolvedValueOnce(discussion);

    return request(app.getHttpServer())
      .get('/discussion/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('context');
      })
  });

  it('should return 400 error when discussion id is not a number', () => {
    return request(app.getHttpServer())
      .get('/discussion/abc')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });

  it('should return 400 error when an error occurs while finding discussion by id', () => {
    jest
      .spyOn(app.get(DiscussionService), 'findDiscussionById')
      .mockRejectedValueOnce(new Error('Failed to find discussion'));

    return request(app.getHttpServer())
      .get('/discussion/1')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Failed to find discussion',
        );
      });
  });

  it('/discussion (POST)', () => {
    return request(app.getHttpServer())
      .post('/discussion')
      .send({
        title: 'Test Discussion',
        context: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.title).toBe('Test Discussion');
        expect(response.body.context).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      });
  });

  it('should return error when creating discussion with invalid context length', () => {
    return request(app.getHttpServer())
      .post('/discussion')
      .send({ title: 'Valid Name', context: 'Test' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
          'Discussion context must have at least 30 characters',
        );
      });
  });

  it('/discussion/:discussionId (PUT)', () => {
    return request(app.getHttpServer())
      .put('/discussion/1')
      .send({
        title: 'Updated Discussion',
        context: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Updated Discussion');
        expect(response.body.context).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      });
  });

  it('should return error when updating discussion with invalid description length', () => {
    return request(app.getHttpServer())
      .put('/discussion/1')
      .send({ title: 'Valid Name', context: 'Test' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'Discussion context must have at least 30 characters',
        );
      });
  });
});
