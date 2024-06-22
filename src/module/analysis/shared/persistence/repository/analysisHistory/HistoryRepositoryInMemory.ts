import { AnalysisHistory } from '@analysis/core/entity/AnalysisHistory';
import { AnalysisHistoryRepository } from './history.repository';
import { AddAnalysisHistoryBody } from '@analysis/core/useCase/AddAnalysisHistory/CreateAnalysisLog.dto';

export class InMemoryAnalysisHistoryRepository
  implements AnalysisHistoryRepository
{
  private analysisHistories: AnalysisHistory[] = [];
  private currentId = 1;

  async addAnalysisHistory(
    input: AddAnalysisHistoryBody,
  ): Promise<AnalysisHistory> {
    const newAnalysis = AnalysisHistory.create(input.request, input.result);
    newAnalysis.id = this.currentId++;
    this.analysisHistories.push(newAnalysis);
    return newAnalysis;
  }
}
