import * as request from 'supertest';

import { AppModule } from '@src/app.module';
import { TestingModule, Test } from '@nestjs/testing';
import { UserRepositoryInMemory, UserRepositorySequelize } from '@identity/shared/persistence';
import UserService from '@identity/shared/service/user.service';
import User from '@identity/core/entity/User';

describe('UserController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserRepositorySequelize)
      .useClass(UserRepositoryInMemory)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it('should return 500 error when an error occurs while listing users', () => {
    jest
      .spyOn(app.get(UserService), 'listUsers')
      .mockRejectedValueOnce(new Error('Failed to fetch users'));

    return request(app.getHttpServer())
      .get('/user')
      .expect(500)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Failed to fetch users',
        );
      });
  });

  it('/user/:userId (GET)', () => {
    const user = User.restore(1, "User 1", "user@email.com", "Secret1231d$");

    jest
      .spyOn(app.get(UserService), 'findUserById')
      .mockResolvedValue(user);

    return request(app.getHttpServer())
      .get('/user/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('password');
      })
  });

  it('should return 400 error when user id is not a number', () => {
    return request(app.getHttpServer())
      .get('/user/abc')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });
  
  it('should return 400 error when an error occurs while finding project by id', () => {
    jest
      .spyOn(app.get(UserService), 'findUserById')
      .mockRejectedValueOnce(new Error('Failed to find user'));

    return request(app.getHttpServer())
      .get('/user/1')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Failed to find user',
        );
      });
  });

  it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'Test User',
        email: 'user@email.com',
        password: "SeCret124$"
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.name).toBe('Test User');
        expect(response.body.email).toBe('user@email.com');
      });
  });

  it('should return error when creating user with invalid name length', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ name: 'AA', email: 'user@email.com', password: "SeCret124$" })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
          'User Name must have at least 3 characters',
        );
      });
  });

  it('/user/:userId (PUT)', () => {
    return request(app.getHttpServer())
      .put('/user/1')
      .send({
        name: 'Updated User',
        email: 'user@email.com',
        password: "SeCret124$"
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Updated User');
        expect(response.body.email).toBe('user@email.com');
      });
  });

  it('should return error when updating user with invalid name length', () => {
    return request(app.getHttpServer())
      .put('/user/1')
      .send({
        name: 'AA',
        email: 'user@email.com',
        password: "SeCret124$"
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'User Name must have at least 3 characters',
        );
      });
  });

});
