import { Module } from '@nestjs/common';

import ProjectRepositorySequelize from './shared/persistence/repository/ProjectRepository/ProjectRepositorySequelize';
import { ProjectController } from './http/project.controller';
import ProjectService from './shared/service/project.service';

import ProjectRatingTopicRepositorySequelize from './shared/persistence/repository/RatingTopicRepository/RatingTopicRepositorySequelize';
import ProjectRatingTopicService from './shared/service/projectRatingTopic.service';
import { RatingTopicController } from './http/ratingTopic.controller';

@Module({
  providers: [
    ProjectRepositorySequelize,
    ProjectService,
    ProjectRatingTopicRepositorySequelize,
    ProjectRatingTopicService,
  ],
  controllers: [ProjectController, RatingTopicController],
})
export class ProjectModule {}
