import { Controller, Get, Res } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import AnalysisService from '../shared/service/analysis.service';

@Controller('/analysis')
@ApiTags('Analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get()
  async getCompleteAnalysis(@Res() response: Response) {
    try {
      const analysis = await this.analysisService.getCompleteAnalysis();
      return response.json(analysis);
    } catch (error) {
      return response.status(500).json({ mensagem: error.message });
    }
  }

  @Get('/names')
  async generateNames(@Res() response: Response) {
    try {
      const names = await this.analysisService.getNamesSuggestions();
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
