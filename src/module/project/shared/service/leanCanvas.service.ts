import { Injectable } from '@nestjs/common';
import {
  CreateLeanCanvas,
  FindLeanCanvasByProject,
  UpdateLeanCanvas,
} from '@project/core/useCase';
import { LeanCanvasRepositorySequelize } from '../persistence/repository/LeanCanvasRepository/LeanCanvasRepositorySequelize';
import LeanCanvas from '@project/core/entity/LeanCanvas';
import { CreateLeanCanvasBody } from '@project/core/useCase/LeanCanvas/CreateLeanCanvasUseCase/CreateLeanCanvas.dto';
import { UpdateLeanCanvasBody } from '@project/core/useCase/LeanCanvas/UpdateProjectUseCase/UpdateLeanCanvas.dto';

@Injectable()
export default class LeanCanvasService {
  constructor(
    private readonly leanCanvasRepository: LeanCanvasRepositorySequelize,
  ) {}

  getLeanCanvasByProject(projectId: number): Promise<LeanCanvas> {
    const findLeanCanvasByProject = new FindLeanCanvasByProject(
      this.leanCanvasRepository,
    );
    return findLeanCanvasByProject.execute(projectId);
  }

  async createLeanCanvas(input: CreateLeanCanvasBody): Promise<LeanCanvas> {
    const createRatingTopic = new CreateLeanCanvas(this.leanCanvasRepository);
    return createRatingTopic.execute(input);
  }

  updateLeanCanvas(
    projectId: number,
    input: UpdateLeanCanvasBody,
  ): Promise<LeanCanvas> {
    const updateLeanCanvas = new UpdateLeanCanvas(this.leanCanvasRepository);
    return updateLeanCanvas.execute(projectId, input);
  }
}
