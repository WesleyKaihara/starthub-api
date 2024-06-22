import { Module } from '@nestjs/common';
import AnalysisService from './shared/service/analysis.service';
import { AnalysisController } from './http/analysis.controller';
import { AnalysisHistoryRepositorySequelize } from './shared/persistence/repository/analysisHistory/AnalysisHistoryRepositorySequelize';

@Module({
  providers: [AnalysisService, AnalysisHistoryRepositorySequelize],
  controllers: [AnalysisController],
})
export class AnalysisModule {}
