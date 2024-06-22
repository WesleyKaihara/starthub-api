import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../core/service/auth.service';
import { ApiTags } from '@nestjs/swagger';
import SignInDto from './dto/signin.dto';
import { Response } from 'express';
import RefreshDto from './dto/refresh.dto';

@Controller('auth')
@ApiTags('Auth')
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
      const accessToken = await this.authService.refresh(data);

      return response.json({ accessToken });
    } catch (error) {
      return response.status(401).send({
        mensagem: `Token Inválido!!`,
      });
    }
  }
}
