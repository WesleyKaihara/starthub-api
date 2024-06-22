import { AnalysisHistory } from '@analysis/core/entity/AnalysisHistory';
import { AddAnalysisHistoryBody } from '@analysis/core/useCase/AddAnalysisHistory/CreateAnalysisLog.dto';

export interface AnalysisHistoryRepository {
  addAnalysisHistory(input: AddAnalysisHistoryBody): Promise<AnalysisHistory>;
}
