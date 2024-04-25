import * as request from 'supertest';

import { AppModule } from '@src/app.module';
import { TestingModule, Test } from '@nestjs/testing';
import {
  UserRatingTopicRepositoryInMemory,
  UserRatingTopicRepositorySequelize,
} from '@project/shared/persistence';
import UserRatingTopicService from '@project/shared/service/userRatingTopic.service';

describe('UserRatingTopicController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserRatingTopicRepositorySequelize)
      .useClass(UserRatingTopicRepositoryInMemory)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user-rating-topic (GET)', () => {
    return request(app.getHttpServer())
      .get('/user-rating-topic')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it('should return 500 error when an error occurs while listing userRatingTopics', () => {
    jest
      .spyOn(app.get(UserRatingTopicService), 'getAllUserRatingTopics')
      .mockRejectedValueOnce(new Error('Failed to fetch userRatingTopics'));

    return request(app.getHttpServer())
      .get('/user-rating-topic')
      .expect(500)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Failed to fetch userRatingTopics',
        );
      });
  });

  it('/user-rating-topic (POST)', () => {
    return request(app.getHttpServer())
      .post('/user-rating-topic')
      .send({
        userId: 1,
        projectId: 1,
        ratingTopicId: 1,
        value: 5,
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.userId).toBe(1);
        expect(response.body.projectId).toBe(1);
        expect(response.body.ratingTopicId).toBe(1);
        expect(response.body.value).toBe(5);
      });
  });

  it('should return error when creating userRatingTopic with invalid userId value', () => {
    return request(app.getHttpServer())
      .post('/user-rating-topic')
      .send({
        userId: -5,
        projectId: 1,
        ratingTopicId: 1,
        value: 5,
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('User ID needs greater than 0');
      });
  });

  it('should return error when creating userRatingTopic with invalid projectId value', () => {
    return request(app.getHttpServer())
      .post('/user-rating-topic')
      .send({
        userId: 1,
        projectId: -7,
        ratingTopicId: 1,
        value: 5,
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
          'Project ID needs greater than 0',
        );
      });
  });

  it('should return error when creating userRatingTopic with invalid rating Topic ID value', () => {
    return request(app.getHttpServer())
      .post('/user-rating-topic')
      .send({
        userId: 1,
        projectId: 8,
        ratingTopicId: -5,
        value: 5,
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
          'Rating Topic ID needs greater than 0',
        );
      });
  });

  it('should return error when creating userRatingTopic with invalid rating value', () => {
    return request(app.getHttpServer())
      .post('/user-rating-topic')
      .send({
        userId: 1,
        projectId: 8,
        ratingTopicId: 5,
        value: -5,
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
          'Value of rating needs greater than 0',
        );
      });
  });
});
