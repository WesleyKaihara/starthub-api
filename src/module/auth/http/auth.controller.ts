import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../core/service/auth.service';
import { ApiTags } from '@nestjs/swagger';
import SignInDto from './dto/signin.dto';
import { Response } from 'express';
import RefreshDto from './dto/refresh.dto';
import { Throttle } from '@nestjs/throttler';
import User from 'src/module/identity/core/entity/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() response: Response) {
    try {
      const logged = await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      );
      return response.json(logged);
    } catch (error) {
      return response.status(401).send({
        mensagem: `Credenciais invalidas!!`,
      });
    }
  }

  @Post('refresh')
  async refresh(@Body() data: RefreshDto, @Res() response: Response) {
    try {
      const payload: User = await this.authService.refresh(data);
      const access_token = await this.authService.generateToken(payload);
      const refresh_token =
        await this.authService.generateRefreshToken(payload);

      return response.json({
        access_token,
        refresh_token,
      });
    } catch (error) {
      return response.status(401).send({
        mensagem: `Token Inválido!!`,
      });
    }
  }
}
