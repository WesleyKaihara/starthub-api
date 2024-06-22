import { Injectable } from '@nestjs/common';
import { AnalysisHistoryRepository } from './history.repository';
import { AddAnalysisHistoryBody } from '@analysis/core/useCase/AddAnalysisHistory/CreateAnalysisLog.dto';
import AnalysisHistoryModel from '../../model/analysisHistory.model';
import { AnalysisHistory } from '@analysis/core/entity/AnalysisHistory';

@Injectable()
export class AnalysisHistoryRepositorySequelize
  implements AnalysisHistoryRepository
{
  async addAnalysisHistory(
    input: AddAnalysisHistoryBody,
  ): Promise<AnalysisHistory> {
    const analysisHistory: AnalysisHistoryModel =
      await AnalysisHistoryModel.create({
        request: input.request,
        result: input.result,
      });

    return AnalysisHistory.restore(
      analysisHistory.id,
      analysisHistory.request,
      analysisHistory.result,
    );
  }
}
