import { Injectable } from '@nestjs/common';

import {
  GetNamesSuggestions,
  GetProjectAnalysis,
  GetToolsRecommendation,
} from '@analysis/core/useCase';
import { LeanCanvasRepositorySequelize } from '@project/shared/persistence';

@Injectable()
export default class AnalysisService {
  constructor(
    private readonly leanCanvasRepository: LeanCanvasRepositorySequelize,
  ) {}

  async getCompleteAnalysis(projectId: number): Promise<any> {
    const getProjectAnalysis = new GetProjectAnalysis(
      this.leanCanvasRepository,
    );

    const analysis = await getProjectAnalysis.execute(projectId);

    return analysis;
  }

  async getNamesSuggestions(projectDescription: string): Promise<any> {
    const getNamesSuggestions = new GetNamesSuggestions();

    const names = await getNamesSuggestions.execute(projectDescription);

    return {
      names,
    };
  }

  async getToolsRecomendations(): Promise<any> {
    const getToolsRecommendation = new GetToolsRecommendation();

    const tools = await getToolsRecommendation.execute(
      `Starthub é uma plataforma destinada a startups, possui diversas funcionalidades destinadas a auxiliar no processo de idealização e validação de ideias`,
    );

    return {
      tools,
    };
  }
}
