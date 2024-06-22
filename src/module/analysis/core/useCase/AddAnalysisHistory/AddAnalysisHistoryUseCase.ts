import { AddAnalysisHistoryBody } from './CreateAnalysisLog.dto';
import { AnalysisHistory } from '@analysis/core/entity/AnalysisHistory';
import { AnalysisHistoryRepository } from '@analysis/shared/persistence';

export class AddAnalysisHistory {
  constructor(
    private readonly analysisHistoryRepository: AnalysisHistoryRepository,
  ) {}

  async execute(input: AddAnalysisHistoryBody): Promise<AnalysisHistory> {
    const history = AnalysisHistory.create(input.request, input.result);
    await this.analysisHistoryRepository.addAnalysisHistory(history);
    return history;
  }
}
