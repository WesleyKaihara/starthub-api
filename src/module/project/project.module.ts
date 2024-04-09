import { Module } from '@nestjs/common';

import ProjectRepositorySequelize from './shared/persistence/repository/ProjectRepository/ProjectRepositorySequelize';
import { ProjectController } from './http/project.controller';
import ProjectService from './shared/service/project.service';

import { RatingTopicController } from './http/ratingTopic.controller';
import RatingTopicRepositorySequelize from './shared/persistence/repository/RatingTopicRepository/RatingTopicRepositorySequelize';
import RatingTopicService from './shared/service/ratingTopic.service';

import UserRatingTopicRepositorySequelize from './shared/persistence/repository/UserRatingTopicRepository/UserRatingTopicRepositorySequelize';
import UserRatingTopicService from './shared/service/userRatingTopic.service';
import { UserRatingTopicController } from './http/userRatingTopic.controller';

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
