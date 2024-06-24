import * as request from 'supertest';

import { AppModule } from '@src/app.module';
import { TestingModule, Test } from '@nestjs/testing';
import {
  UserRepositoryInMemory,
  UserRepositorySequelize,
} from '@identity/shared/persistence';
import { gerarTokenTeste } from '@src/module/auth/http/__test__/auth-guard.mock';

const token = gerarTokenTeste();

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
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).not.toHaveProperty('password');
      });
  });

  it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'Test User',
        email: 'user@email.com',
        password: 'SeCret124$',
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
      .send({ name: 'AA', email: 'user@email.com', password: 'SeCret124$' })
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
        password: 'SeCret124$',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Updated User');
      });
  });

  it('should return error when updating user with invalid name length', () => {
    return request(app.getHttpServer())
      .put('/user/1')
      .send({
        name: 'AA',
        email: 'user@email.com',
        password: 'SeCret124$',
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
