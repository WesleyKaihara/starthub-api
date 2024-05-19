import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import AnalysisService from '../shared/service/analysis.service';
import { GenerateNamesSugestionBody } from '@analysis/core/useCase';
import { GenerateSalesLocationsSuggestionBody } from '@analysis/core/useCase/GetSalesLocationsSuggestions/GetSalesLocationsSuggestions.dto';

@Controller('/analysis')
@ApiTags('Analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('/sales-locations')
  async getCompleteAnalysis(
    @Body() input: GenerateSalesLocationsSuggestionBody,
    @Res() response: Response,
  ) {
    try {
      const salesLocations = await this.analysisService.getSalesSuggestions(
        input.projectDescription,
      );
      return response.json({ salesLocations });
    } catch (error) {
      return response.status(500).json({ mensagem: error.message });
    }
  }

  @Post('/names')
  async generateNames(
    @Body() input: GenerateNamesSugestionBody,
    @Res() response: Response,
  ) {
    try {
      const names = await this.analysisService.getNamesSuggestions(
        input.projectDescription,
      );
      return response.json(names);
    } catch (error) {
      return response.status(500).json({ mensagem: error.message });
    }
  }

  @Get('/tools')
  async getToolsRecomendations(@Res() response: Response) {
    try {
      const tools = await this.analysisService.getToolsRecomendations();
      return response.json(tools);
    } catch (error) {
      return response.status(500).json({ mensagem: error.message });
    }
  }
}
