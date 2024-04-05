import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PersistenceModule } from './shared/module/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './shared/module/config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './module/auth/auth.module';
import { LoggerMiddleware } from './shared/utils/logger';
import { ProjectModule } from '@project/project.module';
import { IdentityModule } from '@identity/identity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      load: [configuration],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    PersistenceModule,
    AuthModule,
    ProjectModule,
    IdentityModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
