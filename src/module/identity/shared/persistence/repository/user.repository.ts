import { Injectable } from '@nestjs/common';
import UserModel from '../model/user.model';
import User from 'src/module/identity/core/entity/user.entity';
import { CreateUserDto } from 'src/module/identity/http/dto/create-user.dto';
import AtualizarUserDto from 'src/module/identity/http/dto/update-user.dto';

@Injectable()
export default class UserRepository {
  public findAll(): Promise<User[]> {
    return UserModel.findAll()
      .then((users) => {
        return users as User[];
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  public async findById(id: number): Promise<User> {
    return await UserModel.findOne({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<User> {
    return await UserModel.findOne({
      where: { email },
    });
  }

  public async findByCpf(cpf: string): Promise<User> {
    return await UserModel.findOne({
      where: { cpf },
    });
  }

  public create(cadastrarUserDto: CreateUserDto): Promise<User> {
    return UserModel.create(cadastrarUserDto as any)
      .then((novaUser) => {
        return novaUser as User;
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  public async update(
    id: number,
    atualizarUserDto: AtualizarUserDto,
  ): Promise<User> {
    const [linhasAfetadas] = await UserModel.update(
      { ...atualizarUserDto },
      { where: { id } },
    );

    if (linhasAfetadas > 0) {
      return await UserModel.findByPk(id);
    } else {
      throw new Error(`Unable to find a user type with id ${id}`);
    }
  }
}
