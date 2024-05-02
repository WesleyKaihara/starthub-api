import { Injectable } from '@nestjs/common';

import {
  GetProjectSugestions,
  GetSimilarProposals,
} from '@analysis/core/useCase';

@Injectable()
export default class AnalysisService {
  constructor() {}

  async getCompleteAnalysis(): Promise<any> {
    const getProjectSugestions = new GetProjectSugestions();
    const getSimilarProposals = new GetSimilarProposals();

    const sugestions = await getProjectSugestions.execute();
    const similarProposals = await getSimilarProposals.execute();

    return {
      sugestions: sugestions.data,
      similarProposals: similarProposals.data,
    };
  }
}
