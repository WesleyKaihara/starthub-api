import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import RefreshDto from '../../http/dto/refresh.dto';
import UserService from '@identity/shared/service/user.service';
import User from '@identity/core/entity/User';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findUserByEmail(email);

    const validCredentials = await bcrypt.compare(pass, user?.password);

    if (!validCredentials) {
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

    try {
      const decodedRefreshToken = this.jwtService.verify(refreshToken, {
        secret: process.env.PUBLIC_KEY,
      });

      const { email } = decodedRefreshToken;
      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const accessToken = await this.generateToken(user);

      return accessToken;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid Signature');
      }
      throw new UnauthorizedException(err.message);
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
        expiresIn: '30s',
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
        expiresIn: '7d',
      },
    );
  }
}
