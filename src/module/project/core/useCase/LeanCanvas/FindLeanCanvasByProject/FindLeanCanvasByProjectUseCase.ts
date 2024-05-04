import LeanCanvas from '@project/core/entity/LeanCanvas';
import { LeanCanvasRepository } from '@project/shared/persistence/repository/LeanCanvasRepository/leanCanvas.repository';

export class FindLeanCanvasByProject {
  constructor(private readonly leanCanvasRepository: LeanCanvasRepository) {}

  async execute(leanCanvasId: number): Promise<LeanCanvas> {
    const leanCanvas =
      await this.leanCanvasRepository.getLeanCanvasByProject(leanCanvasId);

    return leanCanvas;
  }
}
