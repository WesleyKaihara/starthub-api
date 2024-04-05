import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../core/entity/jwtPayload';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('Token não encontrado');
    }

    try {
      const payload = this.jwtService.verify(token) as JwtPayload;
      const roles = this.reflector.get<string[]>('roles', context.getHandler());

      if (roles && roles.includes(payload.role)) {
        return true;
      }

      throw new UnauthorizedException(
        'Você não tem permissão para acessar este recurso',
      );
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
