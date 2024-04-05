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
import ProjectService from '@project/core/service/project.service';
import { Response } from 'express';

import { ZodError } from 'zod';
import {
  CreateProjectDto,
  CreateProjectDtoSchema,
} from './dto/project/create-project.dto';
import {
  UpdateProjectDto,
  UpdateProjectDtoSchema,
} from './dto/project/update-project.dto';

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
    const project = await this.projectService.findProjectById(projectId);
    if (!project) {
      return response.status(404).send({
        message: `Unable to find a project with id ${projectId}.`,
      });
    }
    return response.json(project);
  }

  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Res() response: Response,
  ) {
    try {
      const validSchema = CreateProjectDtoSchema.parse(
        createProjectDto,
      ) as CreateProjectDto;
      const project = await this.projectService.createProject(validSchema);
      return response.json(project);
    } catch (error) {
      if (error instanceof ZodError) {
        return response
          .status(400)
          .json({ message: 'Invalid Schema', errors: error.errors });
      } else {
        return response.status(500).json({ message: error.message });
      }
    }
  }

  @Put('/:projectId')
  async updateProjectById(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() response: Response,
  ) {
    try {
      const validSchema = UpdateProjectDtoSchema.parse(
        updateProjectDto,
      ) as UpdateProjectDto;
      const project = await this.projectService.updateProject(
        projectId,
        validSchema,
      );
      return response.json(project);
    } catch (error) {
      if (error instanceof ZodError) {
        return response
          .status(400)
          .json({ message: 'Invalid Schema', errors: error.errors });
      } else {
        return response.status(500).json({ message: error.message });
      }
    }
  }
}