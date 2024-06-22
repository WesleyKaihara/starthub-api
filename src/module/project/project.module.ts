import { Module } from '@nestjs/common';

import { ProjectController } from './http/project.controller';

import ProjectService from './shared/service/project.service';

import { ProjectRepositorySequelize } from './shared/persistence';
import UploadService from '../upload/shared/service/upload.service';

@Module({
  providers: [ProjectRepositorySequelize, ProjectService, UploadService],
  controllers: [ProjectController],
})
export class ProjectModule {}
