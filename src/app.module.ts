import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { configuration } from './shared/module/config/configuration';

import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerMiddleware } from './shared/utils/logger';

import { AuthModule } from './module/auth/auth.module';
import { ProjectModule } from '@project/project.module';
import { IdentityModule } from '@identity/identity.module';
import { PersistenceModule } from './shared/module/persistence/persistence.module';
import { AnalysisModule } from '@analysis/analysis.module';
import { ProductModule } from './module/product/product.module';

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
    AnalysisModule,
    AuthModule,
    IdentityModule,
    PersistenceModule,
    ProjectModule,
    ProductModule,
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
