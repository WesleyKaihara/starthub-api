import { Test, TestingModule } from '@nestjs/testing';

import UserRole from '@identity/core/entity/user-role.entity';
import { UpdateUserRoleDto } from '@identity/http/dto/userRole/update-user-role.dto';
import { CreateUserRoleDto } from '@identity/http/dto/userRole/create-user-role.dto';
import UserRoleService from '../../user-role.service';
import UserRoleRepository from '@identity/shared/persistence/repository/user-role.repository';

describe('UserRoleService - Test (unit)', () => {
  let roleService: UserRoleService;
  let roleRepository: jest.Mocked<UserRoleRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRoleService,
        {
          provide: UserRoleRepository,
          useFactory: () => ({
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          }),
        },
      ],
    }).compile();

    roleService = module.get<UserRoleService>(UserRoleService);
    roleRepository = module.get(UserRoleRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('List UserRoles (findAll)', () => {
    it('should be return a list of roles', async () => {
      const roles: UserRole[] = [new UserRole()];
      roleRepository.findAll.mockResolvedValue(roles);

      const result = await roleService.listUserRoles();

      expect(roleRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(roles);
    });
  });

  describe('Find UserRole (findById)', () => {
    it('should find a role if roleId is valid', async () => {
      const role: UserRole = {
        id: 999,
        name: 'Admin',
      };
      const roleId = 999;

      roleRepository.findById.mockResolvedValue(role);
      const result = await roleService.findUserRoleById(roleId);

      expect(roleRepository.findById).toHaveBeenCalledWith(roleId);

      expect(result.id).toEqual(roleId);
      expect(result).toStrictEqual(role);
    });

    it('should fail if searching for role with invalid id', async () => {
      const roleId = 999;

      roleRepository.findById.mockResolvedValue(null);
      const result = await roleService.findUserRoleById(roleId);

      expect(roleRepository.findById).toHaveBeenCalledWith(roleId);

      expect(result).toStrictEqual(null);
    });
  });

  describe('Create UserRole (create)', () => {
    it('should be register role if values ​​are valid', async () => {
      const createUserRoleDto: CreateUserRoleDto = {
        name: 'Admin',
      };

      const newUserRole: UserRole = {
        id: 1,
        name: createUserRoleDto.name,
      };

      roleRepository.create.mockResolvedValue(newUserRole);
      const result = await roleService.createUserRole(createUserRoleDto);

      expect(roleRepository.create).toHaveBeenCalledWith(createUserRoleDto);

      expect(result.id).toBeGreaterThan(0);
      expect(result.name).toEqual(createUserRoleDto.name);
    });
  });

  describe('Update UserRole (update)', () => {
    it('should be update role exists and values ​​are valid', async () => {
      const updateUserRoleDto: UpdateUserRoleDto = {
        name: 'Admin',
      };

      const updatedUserRole: UserRole = {
        id: 999,
        name: updateUserRoleDto.name,
      };
      const roleId = 999;

      roleRepository.update.mockResolvedValue(updatedUserRole);
      const result = await roleService.updateUserRole(
        roleId,
        updateUserRoleDto,
      );

      expect(roleRepository.update).toHaveBeenCalledWith(
        roleId,
        updateUserRoleDto,
      );

      expect(result.id).toEqual(roleId);
      expect(result.name).toEqual(updateUserRoleDto.name);
    });
  });
});
