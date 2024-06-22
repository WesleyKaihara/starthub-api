import { Injectable } from '@nestjs/common';

import {
  GenerateSalesLocationsSuggestion,
  GetImportanceData,
  GetNamesSuggestions,
  GetRandomSuggestions,
  GetToolsRecommendation,
} from '@analysis/core/useCase';
import { AddAnalysisHistory } from '@analysis/core/useCase/AddAnalysisHistory/AddAnalysisHistoryUseCase';
import { AnalysisHistoryRepositorySequelize } from '../persistence/repository/analysisHistory/AnalysisHistoryRepositorySequelize';

@Injectable()
export default class AnalysisService {
  constructor(
    private readonly analysisHistoryRepository: AnalysisHistoryRepositorySequelize,
  ) {}
  async getSalesSuggestions(projectDescription: string): Promise<any> {
    const generateSalesLocationsSuggestion =
      new GenerateSalesLocationsSuggestion();

    const salesLocations =
      await generateSalesLocationsSuggestion.execute(projectDescription);

    const saveAnalysis = new AddAnalysisHistory(this.analysisHistoryRepository);
    saveAnalysis.execute({
      request: projectDescription,
      result: JSON.stringify(salesLocations),
    });

    return salesLocations;
  }

  async getImportanceData(projectDescription: string): Promise<any> {
    const getImportanceData = new GetImportanceData();
    const importanceData = await getImportanceData.execute(projectDescription);

    const saveAnalysis = new AddAnalysisHistory(this.analysisHistoryRepository);
    saveAnalysis.execute({
      request: projectDescription,
      result: JSON.stringify(importanceData),
    });

    return importanceData;
  }

  async getNamesSuggestions(projectDescription: string): Promise<any> {
    const getNamesSuggestions = new GetNamesSuggestions();

    const names = await getNamesSuggestions.execute(projectDescription);

    const saveAnalysis = new AddAnalysisHistory(this.analysisHistoryRepository);
    saveAnalysis.execute({
      request: projectDescription,
      result: JSON.stringify(names),
    });

    return {
      names,
    };
  }

  async getToolsRecomendations(projectDescription: string): Promise<any> {
    const getToolsRecommendation = new GetToolsRecommendation();

    const tools = await getToolsRecommendation.execute(projectDescription);

    const saveAnalysis = new AddAnalysisHistory(this.analysisHistoryRepository);
    saveAnalysis.execute({
      request: projectDescription,
      result: JSON.stringify(tools),
    });

    return {
      tools,
    };
  }

  async getRandomSuggestions(projectDescription: string): Promise<any> {
    const getRandomSuggestions = new GetRandomSuggestions();

    const suggestions = await getRandomSuggestions.execute(projectDescription);

    const saveAnalysis = new AddAnalysisHistory(this.analysisHistoryRepository);
    saveAnalysis.execute({
      request: projectDescription,
      result: JSON.stringify(suggestions),
    });

    return {
      suggestions,
    };
  }
}
