import { Injectable } from '@nestjs/common';

import LeanCanvas from '@project/core/entity/LeanCanvas';
import { CreateLeanCanvasBody } from '@project/core/useCase/LeanCanvas/CreateLeanCanvasUseCase/CreateLeanCanvas.dto';
import LeanCanvasModel from '../../model/LeanCanvas';
import { UpdateLeanCanvasBody } from '@project/core/useCase/LeanCanvas/UpdateProjectUseCase/UpdateLeanCanvas.dto';
import { LeanCanvasRepository } from './leanCanvas.repository';

@Injectable()
export class LeanCanvasRepositorySequelize implements LeanCanvasRepository {
  async getLeanCanvasByProject(projectId: number): Promise<LeanCanvas> {
    const leanCanvas = await LeanCanvasModel.findOne({ where: { projectId } });
    if (!leanCanvas) {
      throw new Error(`Lean Canvas for project ${projectId} not found`);
    }
    return LeanCanvas.restore(
      leanCanvas.projectId,
      leanCanvas.problem,
      leanCanvas.customerSegments,
      leanCanvas.uniqueValueProposition,
      leanCanvas.solution,
      leanCanvas.channels,
      leanCanvas.revenueStreams,
      leanCanvas.costStructure,
      leanCanvas.keyMetrics,
      leanCanvas.unfairAdvantage,
    );
  }

  async saveLeanCanvas(input: CreateLeanCanvasBody): Promise<LeanCanvas> {
    const leanCanvas: LeanCanvasModel = await LeanCanvasModel.create({
      projectId: input.projectId,
      problem: input.problem,
      customerSegments: input.customerSegments,
      uniqueValueProposition: input.uniqueValueProposition,
      solution: input.solution,
      channels: input.channels,
      revenueStreams: input.revenueStreams,
      costStructure: input.costStructure,
      keyMetrics: input.keyMetrics,
      unfairAdvantage: input.unfairAdvantage,
    });

    return LeanCanvas.restore(
      leanCanvas.projectId,
      leanCanvas.problem,
      leanCanvas.customerSegments,
      leanCanvas.uniqueValueProposition,
      leanCanvas.solution,
      leanCanvas.channels,
      leanCanvas.revenueStreams,
      leanCanvas.costStructure,
      leanCanvas.keyMetrics,
      leanCanvas.unfairAdvantage,
    );
  }

  async updateLeanCanvas(
    id: number,
    input: UpdateLeanCanvasBody,
  ): Promise<LeanCanvas> {
    const [rowsAffected] = await LeanCanvasModel.update(
      { ...input },
      { where: { id } },
    );

    if (rowsAffected > 0) {
      const project = await LeanCanvasModel.findByPk(id);
      if (!project) {
        throw new Error(`LeanCanvas with id ${id} not found after update`);
      }
      return LeanCanvas.restore(
        input.projectId,
        input.problem,
        input.customerSegments,
        input.uniqueValueProposition,
        input.solution,
        input.channels,
        input.revenueStreams,
        input.costStructure,
        input.keyMetrics,
        input.unfairAdvantage,
      );
    } else {
      throw new Error(`Unable to update project with id ${id}`);
    }
  }
}
