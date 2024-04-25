import * as request from 'supertest';

import { AppModule } from '@src/app.module';
import { TestingModule, Test } from '@nestjs/testing';
import { RatingTopicRepositoryInMemory, RatingTopicRepositorySequelize } from '@project/shared/persistence';
import RatingTopic from '@project/core/entity/RatingTopic';
import RatingTopicService from '@project/shared/service/ratingTopic.service';

describe('RatingTopicController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RatingTopicRepositorySequelize)
      .useClass(RatingTopicRepositoryInMemory)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/rating-topic (GET)', () => {
    return request(app.getHttpServer())
      .get('/rating-topic')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it('should return 500 error when an error occurs while listing ratingTopics', () => {
    jest
      .spyOn(app.get(RatingTopicService), 'getAllRatingTopics')
      .mockRejectedValueOnce(new Error('Failed to fetch ratingTopics'));

    return request(app.getHttpServer())
      .get('/rating-topic')
      .expect(500)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Failed to fetch ratingTopics',
        );
      });
  });

  it('/rating-topic/:ratingTopicId (GET)', () => {
    const ratingTopic = RatingTopic.restore(1, "RatingTopic 1", "Description 1");

    jest
      .spyOn(app.get(RatingTopicService), 'findRatingTopicById')
      .mockResolvedValueOnce(ratingTopic);

    return request(app.getHttpServer())
      .get('/rating-topic/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('description');
      })
  });

  it('shoud return expection when rating topic not found', () => {
    return request(app.getHttpServer())
      .get('/rating-topic/1')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Rating Topic with id 1 not found'
        );
      })
  });

  it('should return 400 error when ratingTopic id is not a number', () => {
    return request(app.getHttpServer())
      .get('/rating-topic/abc')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });

  it('should return 400 error when an error occurs while finding ratingTopic by id', () => {
    jest
      .spyOn(app.get(RatingTopicService), 'findRatingTopicById')
      .mockRejectedValueOnce(new Error('Failed to find ratingTopic'));

    return request(app.getHttpServer())
      .get('/rating-topic/1')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Failed to find ratingTopic',
        );
      });
  });

  it('/rating-topic (POST)', () => {
    return request(app.getHttpServer())
      .post('/rating-topic')
      .send({
        name: 'Test RatingTopic',
        description: 'Test Description'
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.name).toBe('Test RatingTopic');
        expect(response.body.description).toBe('Test Description');
      });
  });

  it('should return error when creating ratingTopic with invalid name length', () => {
    return request(app.getHttpServer())
      .post('/rating-topic')
      .send({ name: 'Test', description: 'Valid Description' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
          'Rating Topic Name must have at least 5 characters',
        );
      });
  });

  it('should return error when creating ratingTopic with invalid description length', () => {
    return request(app.getHttpServer())
      .post('/rating-topic')
      .send({ name: 'Valid Name', description: 'Test' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
          'Rating Topic Description must have at least 10 characters',
        );
      });
  });

  it('/rating-topic/:ratingTopicId (PUT)', () => {
    return request(app.getHttpServer())
      .put('/rating-topic/1')
      .send({
        name: 'Updated RatingTopic',
        description: 'Updated Description'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.name).toBe('Updated RatingTopic');
        expect(response.body.description).toBe('Updated Description');
      });
  });

  it('should return error when updating ratingTopic with invalid name length', () => {
    return request(app.getHttpServer())
      .put('/rating-topic/1')
      .send({
        name: 'test',
        description: 'Valid Description'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'Rating Topic Name must have at least 5 characters',
        );
      });
  });

  it('should return error when updating ratingTopic with invalid description length', () => {
    return request(app.getHttpServer())
      .put('/rating-topic/1')
      .send({ name: 'Valid Name', description: 'Test' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'Rating Topic Description must have at least 10 characters',
        );
      });
  });
});
