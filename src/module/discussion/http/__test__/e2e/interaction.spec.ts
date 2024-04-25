import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';

import {
  InteractionRepositoryInMemory,
  InteractionRepositorySequelize,
} from '@discussion/shared/persistence';
import InteractionService from '@discussion/shared/service/interaction.service';
import Interaction from '@discussion/core/entity/Interaction';

describe('InteractionController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(InteractionRepositorySequelize)
      .useClass(InteractionRepositoryInMemory)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/interaction (GET)', () => {
    return request(app.getHttpServer())
      .get('/interaction')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it('should return 500 error when an error occurs while listing interactions', () => {
    jest
      .spyOn(app.get(InteractionService), 'getInteractions')
      .mockRejectedValueOnce(new Error('Failed to fetch interactions'));

    return request(app.getHttpServer())
      .get('/interaction')
      .expect(500)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Failed to fetch interactions',
        );
      });
  });

  it('/interaction (POST)', () => {
    return request(app.getHttpServer())
      .post('/interaction')
      .send({
        discussionId: 1,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.message).toBe(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        );
      });
  });

  it('should return error when creating interaction with invalid message length', () => {
    return request(app.getHttpServer())
      .post('/interaction')
      .send({ discussionId: 1, message: 'Test' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
          'Interaction message must have at least 10 characters',
        );
      });
  });

  it('/interaction/:interactionId (PUT)', () => {
    return request(app.getHttpServer())
      .put('/interaction/1')
      .send({
        discussionId: 1,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.message).toBe(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        );
      });
  });

  it('should return error when updating interaction with invalid description length', () => {
    return request(app.getHttpServer())
      .put('/interaction/1')
      .send({ discussionId: 1, message: 'Test' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'Interaction message must have at least 10 characters',
        );
      });
  });
});
