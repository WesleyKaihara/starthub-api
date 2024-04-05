import UserRepository from '@identity/shared/persistence/repository/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import UserService from '../../project.service';
import User from '@identity/core/entity/user.entity';
import { CreateUserDto } from '@identity/http/dto/create-user.dto';
import UpdateUserDto from '@identity/http/dto/update-user.dto';

describe('UserService - Test (unit)', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: () => ({
            findAll: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
            findByCpf: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          }),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('List Users (findAll)', () => {
    it('should be return a list of users', async () => {
      const users: User[] = [new User()];
      userRepository.findAll.mockResolvedValue(users);

      const result = await userService.listUsers();

      expect(userRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(users);
    });
  });

  describe('Find User (findById)', () => {
    it('should find a role if roleId is valid', async () => {
      const user: User = {
        id: 999,
        name: 'User test',
        cpf: '455.287.690-27',
        email: 'user.test@email.com',
        password: 'UserTest321',
      };
      const userId = 999;

      userRepository.findById.mockResolvedValue(user);
      const result = await userService.findUserById(userId);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);

      expect(result.id).toEqual(userId);
      expect(result).toStrictEqual(user);
    });

    it('should fail if searching for role with invalid id', async () => {
      const userId = 999;

      userRepository.findById.mockResolvedValue(null);
      const result = await userService.findUserById(userId);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);

      expect(result).toStrictEqual(null);
    });
  });

  describe('Find User (findByEmail)', () => {
    it('should be register role if e-mail is valid', async () => {
      const user: User = {
        id: 999,
        name: 'User test',
        cpf: '455.287.690-27',
        email: 'user.test@email.com',
        password: 'UserTest321',
      };
      const email = 'user.test@email.com';

      userRepository.findByEmail.mockResolvedValue(user);
      const result = await userService.findUserByEmail(email);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);

      expect(result.email).toEqual(email);
      expect(result).toStrictEqual(user);
    });

    it('should fail if searching for user with invalid email', async () => {
      const email = 'invalid.user@email.com';

      userRepository.findByEmail.mockResolvedValue(null);
      const result = await userService.findUserByEmail(email);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);

      expect(result).toStrictEqual(null);
    });
  });

  describe('Buscar User (findByCpf)', () => {
    it('should be register role if cpf ​​is valid', async () => {
      const user: User = {
        id: 999,
        name: 'User test',
        cpf: '455.287.690-27',
        email: 'user.test@email.com',
        password: 'UserTest321',
      };
      const cpf = '455.287.690-27';

      userRepository.findByCpf.mockResolvedValue(user);
      const result = await userService.findUserByCpf(cpf);

      expect(userRepository.findByCpf).toHaveBeenCalledWith(cpf);

      expect(result.cpf).toEqual(cpf);
      expect(result).toStrictEqual(user);
    });

    it('should fail if searching for user with invalid cpf', async () => {
      const cpf = '123.456.789-00';

      userRepository.findByCpf.mockResolvedValue(null);
      const result = await userService.findUserByCpf(cpf);

      expect(userRepository.findByCpf).toHaveBeenCalledWith(cpf);

      expect(result).toStrictEqual(null);
    });
  });

  describe('Create User (create)', () => {
    it('should be register user if values ​​are valid', async () => {
      const createUserDto: CreateUserDto = {
        name: 'User test',
        cpf: '455.287.690-27',
        email: 'user.test@email.com',
        password: 'UserTest321',
      };

      const newUser: User = {
        id: 1,
        name: createUserDto.name,
        cpf: createUserDto.cpf,
        email: createUserDto.email,
        password: createUserDto.password,
      };

      userRepository.create.mockResolvedValue(newUser);
      const result = await userService.createUser(createUserDto);

      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);

      expect(result.id).toBeGreaterThan(0);
      expect(result.name).toEqual(createUserDto.name);
      expect(result.cpf).toEqual(createUserDto.cpf);
      expect(result.email).toEqual(createUserDto.email);
    });
  });

  describe('Update User (update)', () => {
    it('should update user if user exists and values ​​are valid', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'User test',
        cpf: '455.287.690-27',
        email: 'user.test@email.com',
        password: 'UserTest321',
      };

      const updatedUser: User = {
        id: 999,
        name: updateUserDto.name,
        cpf: updateUserDto.cpf,
        email: 'user.test@email.com',
        password: updateUserDto.password,
      };
      const userId = 999;

      userRepository.update.mockResolvedValue(updatedUser);
      const result = await userService.updateUser(userId, updateUserDto);

      expect(userRepository.update).toHaveBeenCalledWith(userId, updateUserDto);

      expect(result.id).toEqual(userId);
      expect(result.name).toEqual(updateUserDto.name);
      expect(result.cpf).toEqual(updateUserDto.cpf);
    });
  });
});
