import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import ProjectService from '@project/shared/service/project.service';
import { CreateProjectBody } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';
import { UpdateProjectBody } from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProject.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        data: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            private: { type: 'boolean' },
          },
        },
      },
    },
  })
  async createProject(
    @Body() input: CreateProjectBody,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 25000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Res() response: Response,
  ) {
    try {
      const project = await this.projectService.createProject(input, file);
      return response.json(project);
    } catch (error) {
      console.log(error);
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
