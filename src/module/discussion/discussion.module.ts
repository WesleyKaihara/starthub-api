import { Module } from '@nestjs/common';
import DiscussionService from './shared/service/discussion.service';
import DiscussionRepositorySequelize from './shared/persistence/repository/DiscussionRepositorySequelize';
import { DiscussionController } from './http/product.controller';

@Module({
  providers: [DiscussionService, DiscussionRepositorySequelize],
  controllers: [DiscussionController],
})
export class DiscussionModule {}
