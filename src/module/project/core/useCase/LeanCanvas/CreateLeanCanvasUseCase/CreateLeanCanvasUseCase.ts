import LeanCanvas from '@project/core/entity/LeanCanvas';
import { CreateLeanCanvasBody } from './CreateLeanCanvas.dto';
import { LeanCanvasRepository } from '@project/shared/persistence/repository/LeanCanvasRepository/leanCanvas.repository';

export class CreateLeanCanvas {
  constructor(private readonly leanCanvasRepository: LeanCanvasRepository) {}

  async execute(input: CreateLeanCanvasBody): Promise<LeanCanvas> {
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

    await this.leanCanvasRepository.saveLeanCanvas(leanCanvas);
    return leanCanvas;
  }
}
