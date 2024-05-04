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
import UploadService from '../upload/shared/service/upload.service';
import { LeanCanvasController } from './http/leanCanvas.controller';
import LeanCanvasService from './shared/service/leanCanvas.service';
import { LeanCanvasRepositorySequelize } from './shared/persistence/repository/LeanCanvasRepository/LeanCanvasRepositorySequelize';

@Module({
  providers: [
    ProjectRepositorySequelize,
    ProjectService,
    RatingTopicRepositorySequelize,
    RatingTopicService,
    UserRatingTopicRepositorySequelize,
    UserRatingTopicService,
    UploadService,
    LeanCanvasService,
    LeanCanvasRepositorySequelize,
  ],
  controllers: [
    ProjectController,
    RatingTopicController,
    UserRatingTopicController,
    LeanCanvasController,
  ],
})
export class ProjectModule {}
