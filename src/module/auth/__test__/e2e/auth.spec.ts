import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '@src/app.module';
import SignInDto from '../../http/dto/signin.dto';
import User from '@identity/core/entity/user.entity';
import UserService from '@identity/core/service/user.service';

describe('Auth - Test (e2e)', () => {
  let app: INestApplication;

  const mockUserService = {
    findUserByEmail: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /login', () => {
    it('deve retornar um token ao realizar login', async () => {
      const signDto: SignInDto = {
        email: 'test.user@email.com',
        password: 'TestUser123',
      };

      const user: User = {
        id: 9999,
        name: 'Test user',
        cpf: '111.111.111-11',
        email: 'test.user@email.com',
        password:
          '$2b$12$zi.PWj5vkADiOikQLw9dju.vuXFIiCL2WvoUx/x7Prc6CfvDrzLey',
      };

      mockUserService.findUserByEmail.mockReturnValue(user);

      const response = await request(app.getHttpServer())
        .post(`/auth/login`)
        .send(signDto);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('access_token');
    });

    it('deve retornar um error ao realizar login com credenciais invalidas', async () => {
      const signDto: SignInDto = {
        email: 'test.user@email.com',
        password: 'Incorrect User',
      };

      const user: User = {
        id: 9999,
        name: 'Test user',
        cpf: '111.111.111-11',
        email: 'test.user@email.com',
        password:
          '$2b$12$zi.PWj5vkADiOikQLw9dju.vuXFIiCL2WvoUx/x7Prc6CfvDrzLey',
      };

      mockUserService.findUserByEmail.mockReturnValue(user);

      const response = await request(app.getHttpServer())
        .post(`/auth/login`)
        .send(signDto);

      expect(response.status).toBe(401);
      expect(response.body.mensagem).not.toEqual({
        mensagem: `Credenciais invalidas!!`,
      });
    });

    it('deve retornar um error ao realizar login para usuário invalido', async () => {
      const signDto: SignInDto = {
        email: 'test.user@email.com',
        password: 'TestUser123',
      };

      mockUserService.findUserByEmail.mockReturnValue(null);

      const response = await request(app.getHttpServer())
        .post(`/auth/login`)
        .send(signDto);

      expect(response.status).toBe(401);
      expect(response.body.mensagem).not.toEqual({
        mensagem: `Credenciais invalidas!!`,
      });
    });
  });
});