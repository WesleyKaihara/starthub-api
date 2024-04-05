import { Module } from '@nestjs/common';
import ProjectRepositorySequelize from './shared/persistence/repository/ProjectRepositorySequelize';
import { ProjectController } from './http/project.controller';
import ProjectService from './core/service/project.service';

@Module({
  providers: [ProjectRepositorySequelize, ProjectService],
  controllers: [ProjectController],
  exports: [],
})
export class ProjectModule {}
