import { Module } from '@nestjs/common';
import AnalysisService from './shared/service/analysis.service';
import { AnalysisController } from './http/analysis.controller';
import { LeanCanvasRepositorySequelize } from '@project/shared/persistence';

@Module({
  providers: [AnalysisService, LeanCanvasRepositorySequelize],
  controllers: [AnalysisController],
})
export class AnalysisModule {}
