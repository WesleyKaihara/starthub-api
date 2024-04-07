import { Module } from '@nestjs/common';
import AnalysisService from './shared/service/analysis.service';
import { AnalysisController } from './http/analysis.controller';

@Module({
  providers: [AnalysisService],
  controllers: [AnalysisController],
})
export class AnalysisModule {}
