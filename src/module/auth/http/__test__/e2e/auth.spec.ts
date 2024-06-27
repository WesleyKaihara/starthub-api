import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';
import UserService from '@identity/shared/service/user.service';
import User from '@identity/core/entity/User';
import SignInDto from '../../dto/signin.dto';
import RefreshDto from '../../dto/refresh.dto';
import { AuthService } from '@src/module/auth/core/service/auth.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    authService = moduleFixture.get(AuthService);
    userService = moduleFixture.get(UserService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/login', () => {
    it('should return an error for invalid credentials', async () => {
      const signInDto: SignInDto = {
        email: 'test.user@email.com',
        password: 'TestUser123',
      };

      jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(null);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(signInDto);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ mensagem: 'Credenciais invalidas!!' });
    });

    it('should return an error when email is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          password: 'TestUser123',
        });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ mensagem: 'Credenciais invalidas!!' });
    });

    it('should return an error when password is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test.user@email.com',
        });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ mensagem: 'Credenciais invalidas!!' });
    });

    it('should return tokens for valid credentials', async () => {
      const signInDto: SignInDto = {
        email: 'test.user@email.com',
        password: 'TestUser123',
      };
      const user = User.restore(
        999,
        'Test user',
        '208.465.980-94',
        'test.user@email.com',
        '$2b$12$zi.PWj5vkADiOikQLw9dju.vuXFIiCL2WvoUx/x7Prc6CfvDrzLey',
      );

      jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(user);
      jest
        .spyOn(authService, 'generateToken')
        .mockResolvedValueOnce('access_token');
      jest
        .spyOn(authService, 'generateRefreshToken')
        .mockResolvedValueOnce('refresh_token');

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(signInDto);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      });
    });
  });

  describe('POST /auth/refresh', () => {
    it('should return an error when refresh token is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({});

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        mensagem: 'Token Inválido!!',
      });
    });

    it('should return an error for expired refresh token', async () => {
      const refreshDto: RefreshDto = {
        refreshToken: 'expired_refresh_token',
      };

      jest.spyOn(authService, 'refresh').mockImplementationOnce(() => {
        throw new Error('TokenExpiredError');
      });

      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send(refreshDto);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ mensagem: 'Token Inválido!!' });
    });

    it('should return an error for invalid signature in refresh token', async () => {
      const refreshDto: RefreshDto = {
        refreshToken: 'invalid_signature_refresh_token',
      };

      jest.spyOn(authService, 'refresh').mockImplementationOnce(() => {
        throw new Error('JsonWebTokenError');
      });

      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send(refreshDto);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ mensagem: 'Token Inválido!!' });
    });

    it('should return an error for invalid refresh token', async () => {
      const refreshDto: RefreshDto = {
        refreshToken: 'invalid_refresh_token',
      };

      jest.spyOn(authService, 'refresh').mockImplementationOnce(() => {
        throw new Error('Invalid refresh token');
      });

      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send(refreshDto);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ mensagem: 'Token Inválido!!' });
    });

    it('should return an error when user is not found for refresh token', async () => {
      const refreshDto: RefreshDto = {
        refreshToken: 'valid_refresh_token_but_user_not_found',
      };

      jest.spyOn(authService, 'refresh').mockImplementationOnce(() => {
        throw new NotFoundException('User not found');
      });

      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send(refreshDto);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ mensagem: 'Token Inválido!!' });
    });

    it('should return new tokens for valid refresh token', async () => {
      const refreshDto: RefreshDto = {
        refreshToken: 'valid_refresh_token',
      };

      jest
        .spyOn(authService, 'refresh')
        .mockResolvedValueOnce('new_access_token');
      jest
        .spyOn(authService, 'generateToken')
        .mockResolvedValueOnce('new_access_token');
      jest
        .spyOn(authService, 'generateRefreshToken')
        .mockResolvedValueOnce('new_refresh_token');

      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send(refreshDto);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        accessToken: 'new_access_token',
      });
    });
  });
});
