import LeanCanvas from '@project/core/entity/LeanCanvas';
import { CreateLeanCanvasBody } from '@project/core/useCase/LeanCanvas/CreateLeanCanvasUseCase/CreateLeanCanvas.dto';
import { UpdateLeanCanvasBody } from '@project/core/useCase/LeanCanvas/UpdateProjectUseCase/UpdateLeanCanvas.dto';

export interface LeanCanvasRepository {
  getLeanCanvasByProject(projectId: number): Promise<LeanCanvas>;
  saveLeanCanvas(input: CreateLeanCanvasBody): Promise<LeanCanvas>;
  updateLeanCanvas(
    projectId: number,
    updateProjectDto: UpdateLeanCanvasBody,
  ): Promise<LeanCanvas>;
}
