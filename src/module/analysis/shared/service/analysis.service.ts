import { Injectable } from '@nestjs/common';

import GetCompleteAnalysis from '@analysis/core/useCase/GetCompleteAnalysis/GetCompleteAnalysisUseCase';

@Injectable()
export default class AnalysisService {
  constructor() {}

  getCompleteAnalysis(): Promise<any> {
    const getCompleteAnalysis = new GetCompleteAnalysis();
    return getCompleteAnalysis.execute();
  }
}
