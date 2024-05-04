import { Injectable } from '@nestjs/common';

import {
  GetNamesSuggestions,
  GetProjectSugestions,
  GetSimilarProposals,
  GetToolsRecommendation,
} from '@analysis/core/useCase';

@Injectable()
export default class AnalysisService {
  constructor() {}

  async getCompleteAnalysis(): Promise<any> {
    const getProjectSugestions = new GetProjectSugestions();
    const getSimilarProposals = new GetSimilarProposals();

    const sugestions = await getProjectSugestions.execute();
    const similarProposals = await getSimilarProposals.execute(
      'Uma plataforma destinada a auxliar no processo de validação de startups por meio de forúns internos e IA',
    );

    return {
      sugestions: sugestions.data,
      similarProposals: similarProposals.data,
    };
  }

  async getNamesSuggestions(): Promise<any> {
    const getNamesSuggestions = new GetNamesSuggestions();

    const names = await getNamesSuggestions.execute(
      'Uma plataforma destinada a auxliar no processo de validação de startups por meio de forúns internos e IA',
    );

    return {
      names,
    };
  }

  async getToolsRecomendations(): Promise<any> {
    const getToolsRecommendation = new GetToolsRecommendation();

    const tools = await getToolsRecommendation.execute(
      'Uma plataforma destinada a auxliar no processo de validação de startups por meio de forúns internos e IA',
    );

    return {
      tools,
    };
  }
}
