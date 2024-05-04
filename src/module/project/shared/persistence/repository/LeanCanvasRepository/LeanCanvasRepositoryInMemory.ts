import LeanCanvas from '@project/core/entity/LeanCanvas';
import { LeanCanvasRepository } from './leanCanvas.repository';
import { CreateLeanCanvasBody } from '@project/core/useCase/LeanCanvas/CreateLeanCanvasUseCase/CreateLeanCanvas.dto';
import { UpdateLeanCanvasBody } from '@project/core/useCase/LeanCanvas/UpdateProjectUseCase/UpdateLeanCanvas.dto';

export class LeanCanvasRepositoryInMemory implements LeanCanvasRepository {
  private leanCanvas: LeanCanvas[];
  private nextId: number;

  constructor() {
    this.leanCanvas = [];
    this.nextId = 1;
  }
  async getLeanCanvasByProject(projectId: number): Promise<LeanCanvas> {
    const leanCanvas = this.leanCanvas.find(
      (leanCanvas) => leanCanvas.projectId === projectId,
    );
    if (!leanCanvas) {
      throw new Error(`Lean Canvas for project ${projectId} not found`);
    }
    return leanCanvas;
  }

  async saveLeanCanvas(input: CreateLeanCanvasBody): Promise<LeanCanvas> {
    const leanCanvas = LeanCanvas.create(
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
    leanCanvas.projectId = this.nextId++;
    this.leanCanvas.push(leanCanvas);
    return leanCanvas;
  }

  async updateLeanCanvas(
    projectId: number,
    input: UpdateLeanCanvasBody,
  ): Promise<LeanCanvas | null> {
    const leanCanvasIndex = this.leanCanvas.findIndex(
      (leanCanvas) => leanCanvas.projectId === projectId,
    );
    if (leanCanvasIndex !== -1) {
      const updatedLeanCanvas = LeanCanvas.restore(
        projectId,
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
      updatedLeanCanvas.projectId = projectId;
      this.leanCanvas[leanCanvasIndex] = updatedLeanCanvas;
      return updatedLeanCanvas;
    }
    return null;
  }
}
