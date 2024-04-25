import { Module } from '@nestjs/common';

import { RatingTopicController } from './http/ratingTopic.controller';
import { UserRatingTopicController } from './http/userRatingTopic.controller';
import { ProjectController } from './http/project.controller';

import RatingTopicService from './shared/service/ratingTopic.service';
import ProjectService from './shared/service/project.service';
import UserRatingTopicService from './shared/service/userRatingTopic.service';

import {
  ProjectRepositorySequelize,
  RatingTopicRepositorySequelize,
  UserRatingTopicRepositorySequelize,
} from './shared/persistence';

@Module({
  providers: [
    ProjectRepositorySequelize,
    ProjectService,
    RatingTopicRepositorySequelize,
    RatingTopicService,
    UserRatingTopicRepositorySequelize,
    UserRatingTopicService,
  ],
  controllers: [
    ProjectController,
    RatingTopicController,
    UserRatingTopicController,
  ],
})
export class ProjectModule {}
