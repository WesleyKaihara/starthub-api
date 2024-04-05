import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '@src/app.module';

import { verificaErroZod } from '../../../../../test/utils/zod-validations';
import {
  AuthGuardMock,
  gerarTokenTeste,
} from '@src/module/auth/__test__/auth-guard.mock';
import UserService from '@identity/core/service/user.service';
import User from '@identity/core/entity/user.entity';
import { CreateUserDto } from '@identity/http/dto/create-user.dto';
import UpdateUserDto from '@identity/http/dto/update-user.dto';

describe('User - Test (e2e)', () => {
  let app: INestApplication;

  const mockUserService = {
    listUsers: jest.fn(),
    findUserById: jest.fn(),
    findUserByEmail: jest.fn(),
    findUserByCpf: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider('AuthGuard')
      .useValue(AuthGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /user', () => {
    it('deve retornar um lista de user se estiver autenticado', async () => {
      const user: User[] = [new User(), new User(), new User()];
      mockUserService.listUsers.mockReturnValue(user);

      (AuthGuardMock as any).prototype.canActivate = () => true;
      const token = await gerarTokenTeste();

      const response = await request(app.getHttpServer())
        .get('/user')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(user);
    });

    it('não deve retornar uma listar de user se não possuir o nível de acesso suficiente', async () => {
      const user: User[] = [new User(), new User(), new User()];

      mockUserService.listUsers.mockReturnValue(user);

      const response = await request(app.getHttpServer()).get('/user');
      expect(response.status).toBe(401);
    });

    it('deve tratar erros se ocorrer falha na API', async () => {
      (AuthGuardMock as any).prototype.canActivate = () => true;
      mockUserService.listUsers.mockImplementation(() => {
        throw new Error('Erro na API');
      });

      const token = gerarTokenTeste();
      const response = await request(app.getHttpServer())
        .get('/user')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('mensagem');
    });
  });

  describe('GET /user/:pessoaId', () => {
    it('deve retornar uma pessoa existente por ID', async () => {
      const pessoa: User = {
        id: 9999,
        name: 'Nova User',
        email: 'nova.pessoa@email.com',
        cpf: '000.000.000-00',
        password: 'password123',
      };
      const pesssoaId: number = 9999;

      mockUserService.findUserById.mockReturnValue(pessoa);

      const response = await request(app.getHttpServer()).get(
        `/user/${pesssoaId}`,
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(pessoa);
    });

    it('deve retornar um erro se pessoa não existir', async () => {
      const pessoaId: number = 9999;

      mockUserService.findUserById.mockReturnValue(null);

      const response = await request(app.getHttpServer()).get(
        `/user/${pessoaId}`,
      );
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('mensagem');
      expect(response.body.mensagem).not.toEqual({
        mensagem: `
      Não foi possível encontrar uma pessoa com id ${pessoaId}.
      `,
      });
    });
  });

  describe('POST /user', () => {
    it('deve cadastrar uma nova pessoa se informações forem válidas', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Nova User',
        email: 'nova.pessoa@email.com',
        cpf: '000.000.000-00',
        password: 'password123',
      };

      const novaUser: User = {
        id: 9999,
        name: createUserDto.name,
        email: createUserDto.email,
        cpf: createUserDto.cpf,
        password: createUserDto.password,
      };

      mockUserService.createUser.mockReturnValue(novaUser);

      const response = await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto);

      expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual(novaUser);
    });

    it('deve lançar um erro ao tentar cadastrar um pessoa com uma password fraca', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Nova User',
        email: 'nova.pessoa@email.com',
        cpf: '000.000.000-00',
        password: 'fraca',
      };

      const response = await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto);

      const passwordFraca = verificaErroZod(
        response.body.errors,
        'Senha deve ter no mínimo 8 caracteres',
      );

      expect(passwordFraca).toBe(true);
      expect(response.status).toBe(400);
    });

    it('deve lançar um erro ao tentar cadastrar um pessoa com cpf em formato inválido', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Nova User',
        email: 'nova.pessoa@email.com',
        cpf: '00000000000',
        password: 'Forte@1238$',
      };

      const response = await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto);

      const passwordFraca = verificaErroZod(
        response.body.errors,
        'CPF com formato inválido',
      );

      expect(passwordFraca).toBe(true);
      expect(response.status).toBe(400);
    });

    it('deve lançar um erro ao tentar cadastrar um pessoa com email em formato inválido', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Nova User',
        email: 'nova.pessoa',
        cpf: '000.000.000-00',
        password: 'Forte@1238$',
      };

      const response = await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto);
      const invalidEmail = verificaErroZod(
        response.body.errors,
        'E-mail inválido',
      );

      expect(invalidEmail).toBe(true);
      expect(response.status).toBe(400);
    });

    it('deve tratar erros se ocorrer falha na API', async () => {
      mockUserService.createUser.mockImplementation(() => {
        throw new Error('Erro na API');
      });

      const createUserDto: CreateUserDto = {
        name: 'Nova User',
        email: 'nova.pessoa@email.com',
        cpf: '000.000.000-00',
        password: 'Forte@1238$',
      };

      const response = await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('mensagem');
    });
  });

  describe('PUT /pesssoas/:pessoaId', () => {
    it('deve retornar uma pesssoa existente se Existir', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'User Atualizada',
        email: 'pessoa@email.com',
        cpf: '000.000.000-00',
        password: 'password123',
      };

      const pessoa: User = {
        id: 9999,
        name: updateUserDto.name,
        email: 'pessoa@email.com',
        cpf: updateUserDto.cpf,
        password: updateUserDto.password,
      };

      const empresaId: number = 9999;

      mockUserService.updateUser.mockReturnValue(pessoa);

      const response = await request(app.getHttpServer())
        .put(`/user/${empresaId}`)
        .send(updateUserDto);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...result } = response.body;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...pessoaAtualizada } = pessoa;

      expect(response.status).toBe(200);
      expect(result).toStrictEqual(pessoaAtualizada);
    });

    it('deve retornar um erro se pessoa não existir', async () => {
      const pessoaId = 9999;

      mockUserService.updateUser.mockImplementation(() => {
        throw new Error(
          `Não foi possível encontrar uma pessoa com id ${pessoaId}`,
        );
      });

      const response = await request(app.getHttpServer()).put(
        `/user/${pessoaId}`,
      );
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('mensagem');
      expect(response.body.mensagem).not.toEqual({
        mensagem: `Não foi possível encontrar uma pessoa com id ${pessoaId}`,
      });
    });

    it('deve tratar erros se ocorrer falha na API', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'User Atualizada',
        email: 'user.test@email.com',
        cpf: '000.000.000-00',
        password: 'password123',
      };

      const empresaId: number = 9999;
      mockUserService.createUser.mockImplementation(() => {
        throw new Error('Erro na API');
      });

      const response = await request(app.getHttpServer())
        .put(`/user/${empresaId}`)
        .send(updateUserDto);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('mensagem');
    });
  });
});
