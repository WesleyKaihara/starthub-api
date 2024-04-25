import { Module } from '@nestjs/common';
import DiscussionService from './shared/service/discussion.service';
import { DiscussionController } from './http/discussion.controller';
import InteractionService from './shared/service/interaction.service';
import { InteractionController } from './http/interaction.controller';
import {
  DiscussionRepositorySequelize,
  InteractionRepositorySequelize,
} from './shared/persistence';

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
