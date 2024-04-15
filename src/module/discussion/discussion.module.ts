import { Module } from '@nestjs/common';
import DiscussionService from './shared/service/discussion.service';
import DiscussionRepositorySequelize from './shared/persistence/repository/DiscussionRepositorySequelize';
import { DiscussionController } from './http/discussion.controller';
import InteractionService from './shared/service/interaction.service';
import InteractionRepositorySequelize from './shared/persistence/repository/Interaction/InteractionRepositorySequelize';
import { InteractionController } from './http/interaction.controller';

@Module({
  providers: [
    DiscussionService,
    DiscussionRepositorySequelize,
    InteractionService,
    InteractionRepositorySequelize,
  ],
  controllers: [DiscussionController, InteractionController],
})
export class DiscussionModule {}
