import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '@src/app.module';

import { verificaErroZod } from '../../../../../test/utils/zod-validations';
import UserRoleService from '@identity/core/service/user-role.service';
import UserRole from '@identity/core/entity/user-role.entity';
import { CreateUserRoleDto } from '@identity/http/dto/userRole/create-user-role.dto';
import { UpdateUserRoleDto } from '@identity/http/dto/userRole/update-user-role.dto';

import { MIN_CHARACTERES_NAME } from '@identity/http/dto/userRole/userRole.constant';

describe('User Role - Test (e2e)', () => {
  let app: INestApplication;

  const mockUserRoleService = {
    listUserRoles: jest.fn(),
    findUserRoleById: jest.fn(),
    createUserRole: jest.fn(),
    updateUserRole: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserRoleService)
      .useValue(mockUserRoleService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /user-role', () => {
    it('deve retornar uma lista de tipos de pessoas', async () => {
      const userRoles: UserRole[] = [
        new UserRole(),
        new UserRole(),
        new UserRole(),
      ];

      mockUserRoleService.listUserRoles.mockReturnValue(userRoles);

      const response = await request(app.getHttpServer()).get('/user-role');
      expect(response.status).toBe(200);
    });

    it('deve tratar erros se ocorrer falha na API', async () => {
      mockUserRoleService.listUserRoles.mockImplementation(() => {
        throw new Error('Erro na API');
      });

      const response = await request(app.getHttpServer()).get('/user-role');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('mensagem');
    });
  });

  describe('GET /user-role/:roleId', () => {
    it('deve retornar um tipo de pessoa existente por ID', async () => {
      const userRole: UserRole = {
        id: 9999,
        name: 'Admin',
      };
      const roleId: number = 9999;

      mockUserRoleService.findUserRoleById.mockReturnValue(userRole);

      const response = await request(app.getHttpServer()).get(
        `/user-role/${roleId}`,
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(userRole);
    });

    it('deve retornar um erro se tipo de pessoa não existir', async () => {
      const roleId: number = 9999;

      mockUserRoleService.findUserRoleById.mockReturnValue(null);

      const response = await request(app.getHttpServer()).get(
        `/user-role/${roleId}`,
      );
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('mensagem');
      expect(response.body.mensagem).not.toEqual({
        mensagem: `
        Não foi possível encontrar um tipo de pessoa com id ${roleId}.
      `,
      });
    });
  });

  describe('POST /user-role', () => {
    it('deve cadastrar nova tipo de pessoa se informações forem válidas', async () => {
      const createUserRoleDto: CreateUserRoleDto = {
        name: 'Nova UserRole',
      };

      const newRole: UserRole = {
        id: 9999,
        name: createUserRoleDto.name,
      };

      mockUserRoleService.createUserRole.mockReturnValue(newRole);

      const response = await request(app.getHttpServer())
        .post('/user-role')
        .send(createUserRoleDto);

      expect(mockUserRoleService.createUserRole).toHaveBeenCalledWith(
        createUserRoleDto,
      );
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual(newRole);
    });

    it('deve lançar um erro ao tentar cadastrar um tipo de Pessoa com name inválido', async () => {
      const createUserRoleDto: CreateUserRoleDto = {
        name: 'AD',
      };

      const response = await request(app.getHttpServer())
        .post('/user-role')
        .send(createUserRoleDto);

      const telefoneInvalido = verificaErroZod(
        response.body.errors,
        `User role name must have at least ${MIN_CHARACTERES_NAME} characters`,
      );

      expect(telefoneInvalido).toBe(true);
      expect(response.status).toBe(400);
    });

    it('deve tratar erros se ocorrer falha na API', async () => {
      mockUserRoleService.createUserRole.mockImplementation(() => {
        throw new Error('Erro na API');
      });

      const createUserRoleDto: CreateUserRoleDto = {
        name: 'Admin',
      };

      const response = await request(app.getHttpServer())
        .post('/user-role')
        .send(createUserRoleDto);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('mensagem');
    });
  });

  describe('PUT /pesssoa-tipo/:roleId', () => {
    it('deve retornar uma pesssoa existente se Existir', async () => {
      const updateUserRoleDto: UpdateUserRoleDto = {
        name: 'Funcionário',
      };

      const userRole: UserRole = {
        id: 9999,
        name: updateUserRoleDto.name,
      };

      const roleId: number = 9999;

      mockUserRoleService.updateUserRole.mockReturnValue(userRole);

      const response = await request(app.getHttpServer())
        .put(`/user-role/${roleId}`)
        .send(updateUserRoleDto);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(userRole);
    });

    it('deve retornar um erro se Tipo da Pessoa não existir', async () => {
      const roleId = 9999;

      mockUserRoleService.updateUserRole.mockImplementation(() => {
        throw new Error(
          `Não foi possível encontrar o tipo de  pessoa com id ${roleId}`,
        );
      });

      const response = await request(app.getHttpServer()).put(
        `/user-role/${roleId}`,
      );
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('mensagem');
      expect(response.body.mensagem).not.toEqual({
        mensagem: `Não foi possível encontrar uma userRole com id ${roleId}`,
      });
    });

    it('deve tratar erros se ocorrer falha na API', async () => {
      const updateUserRoleDto: UpdateUserRoleDto = {
        name: 'Funcionário',
      };

      const roleId: number = 9999;
      mockUserRoleService.updateUserRole.mockImplementation(() => {
        throw new Error('Erro na API');
      });

      const response = await request(app.getHttpServer())
        .put(`/user-role/${roleId}`)
        .send(updateUserRoleDto);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('mensagem');
    });
  });
});
