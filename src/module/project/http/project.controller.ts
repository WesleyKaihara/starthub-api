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
import { Response } from 'express';

import ProjectService from '@project/shared/service/project.service';
import { CreateProjectBody } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';
import { UpdateProjectBody } from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProject.dto';

@Controller('/project')
@ApiTags('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async listProjects(@Res() response: Response) {
    try {
      const projects = await this.projectService.getAllProjects();
      return response.json(projects);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  @Get('/:projectId')
  async findProjectById(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Res() response: Response,
  ) {
    try {
      const project = await this.projectService.findProjectById(projectId);
      return response.json(project);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectBody,
    @Res() response: Response,
  ) {
    try {
      const project = await this.projectService.createProject(createProjectDto);
      return response.json(project);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Put('/:projectId')
  async updateProjectById(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Body() input: UpdateProjectBody,
    @Res() response: Response,
  ) {
    try {
      const project = await this.projectService.updateProject(projectId, input);
      return response.json(project);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
