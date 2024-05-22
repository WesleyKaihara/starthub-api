import { Injectable } from '@nestjs/common';

import {
  GenerateSalesLocationsSuggestion,
  GetImportanceData,
  GetNamesSuggestions,
  GetProjectAnalysis,
  GetRandomSuggestions,
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

  async getSalesSuggestions(projectDescription: string): Promise<any> {
    const generateSalesLocationsSuggestion =
      new GenerateSalesLocationsSuggestion();

    const salesLocations =
      await generateSalesLocationsSuggestion.execute(projectDescription);

    return salesLocations;
  }

  async getImportanceData(projectDescription: string): Promise<any> {
    const getImportanceData = new GetImportanceData();

    const importanceData = await getImportanceData.execute(projectDescription);

    return importanceData;
  }

  async getNamesSuggestions(projectDescription: string): Promise<any> {
    const getNamesSuggestions = new GetNamesSuggestions();

    const names = await getNamesSuggestions.execute(projectDescription);

    return {
      names,
    };
  }

  async getToolsRecomendations(projectDescription: string): Promise<any> {
    const getToolsRecommendation = new GetToolsRecommendation();

    const tools = await getToolsRecommendation.execute(projectDescription);

    return {
      tools,
    };
  }

  async getRandomSuggestions(projectDescription: string): Promise<any> {
    const getRandomSuggestions = new GetRandomSuggestions();

    const suggestions = await getRandomSuggestions.execute(projectDescription);

    return {
      suggestions,
    };
  }
}
