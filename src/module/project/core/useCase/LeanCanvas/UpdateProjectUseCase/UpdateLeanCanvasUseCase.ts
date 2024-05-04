import LeanCanvas from '@project/core/entity/LeanCanvas';
import { UpdateLeanCanvasBody } from './UpdateLeanCanvas.dto';
import { LeanCanvasRepository } from '@project/shared/persistence/repository/LeanCanvasRepository/leanCanvas.repository';

export class UpdateLeanCanvas {
  constructor(private readonly leanCanvasRepository: LeanCanvasRepository) {}

  async execute(
    projectId: number,
    input: UpdateLeanCanvasBody,
  ): Promise<LeanCanvas> {
    const leanCanvas = LeanCanvas.update(
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

    await this.leanCanvasRepository.updateLeanCanvas(projectId, leanCanvas);
    return leanCanvas;
  }
}
