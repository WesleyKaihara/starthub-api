import { Module } from '@nestjs/common';
import { AuthService } from './core/service/auth.service';
import { AuthController } from './http/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './core/constants';
import { IdentityModule } from '../identity/identity.module';

@Module({
  imports: [
    IdentityModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
