import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import RefreshDto from '../../http/dto/refresh.dto';
import User from 'src/module/identity/core/entity/user.entity';
import UserService from '@identity/core/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findUserByEmail(email);

    const validCredencials = await bcrypt.compare(pass, user?.password);

    if (!validCredencials) {
      throw new UnauthorizedException();
    }

    const token = await this.generateToken(user);
    const refresh_token = await this.generateRefreshToken(user);

    return {
      access_token: token,
      refresh_token,
    };
  }

  async refresh(data: RefreshDto) {
    const { refreshToken } = data;

    const email = this.jwtService.decode(refreshToken)['email'];
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.PUBLIC_KEY,
      });
      return user;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid Signature');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expired');
      }
      throw new UnauthorizedException(err.name);
    }
  }

  async generateToken(payload: User) {
    return this.jwtService.sign(
      {
        sub: payload.id,
        username: payload.name,
        email: payload.email,
        role: 'user',
      },
      {
        secret: process.env.SECRET,
        expiresIn: '5m',
      },
    );
  }

  async generateRefreshToken(payload: User) {
    return this.jwtService.sign(
      {
        sub: payload.id,
        username: payload.name,
        email: payload.email,
        role: 'user',
      },
      {
        secret: process.env.PUBLIC_KEY,
        expiresIn: '60s',
      },
    );
  }
}
