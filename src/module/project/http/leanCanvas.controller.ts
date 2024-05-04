import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateLeanCanvasBody } from '@project/core/useCase/LeanCanvas/CreateLeanCanvasUseCase/CreateLeanCanvas.dto';
import { UpdateLeanCanvasBody } from '@project/core/useCase/LeanCanvas/UpdateProjectUseCase/UpdateLeanCanvas.dto';
import LeanCanvasService from '@project/shared/service/leanCanvas.service';
import { Response } from 'express';

@Controller('/lean-canvas')
@ApiTags('Lean Canvas')
export class LeanCanvasController {
  constructor(private readonly leanCanvasService: LeanCanvasService) {}

  @Get('/:projectId')
  async getLeanCanvasByProject(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Res() response: Response,
  ) {
    try {
      const leanCanvas =
        await this.leanCanvasService.getLeanCanvasByProject(projectId);

      return response.json(leanCanvas);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post()
  async createLeanCanvas(
    @Body() input: CreateLeanCanvasBody,
    @Res() response: Response,
  ) {
    try {
      const leanCanvas = await this.leanCanvasService.createLeanCanvas(input);
      return response.json(leanCanvas);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Put('/:projectId')
  async updateLeanCanvasByProjectId(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Body() input: UpdateLeanCanvasBody,
    @Res() response: Response,
  ) {
    try {
      const leanCanvas = await this.leanCanvasService.updateLeanCanvas(
        projectId,
        input,
      );
      return response.json(leanCanvas);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
