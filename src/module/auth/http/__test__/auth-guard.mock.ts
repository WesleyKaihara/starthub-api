import { CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../core/constants';

export class AuthGuardMock implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }

    return true;
  }
}

export function gerarTokenTeste() {
  const payload = { sub: 999, username: 'Usuário testes' };
  const token = jwt.sign(payload, jwtConstants.secret);

  return token;
}
