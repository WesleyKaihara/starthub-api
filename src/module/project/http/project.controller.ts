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
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import ProjectService from '@project/shared/service/project.service';
import { CreateProjectBody } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';
import { UpdateProjectBody } from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProject.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AuthGuard,
  AuthenticatedRequest,
} from '@src/module/auth/guard/auth.guard';

@Controller('/project')
@ApiTags('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({
    summary: 'Listar todos os projetos ativos',
  })
  @Get()
  async listProjects(@Res() response: Response) {
    try {
      const projects = await this.projectService.getAllProjects();
      return response.json(projects);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  @ApiOperation({
    summary: 'Buscar todas as informações de um projeto',
  })
  @UseGuards(AuthGuard)
  @Get('/:projectId')
  async findProjectById(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Req() request: AuthenticatedRequest,
    @Res() response: Response,
  ) {
    try {
      const userId = Number(request.user.sub);
      const project = await this.projectService.findProjectById(
        projectId,
        userId,
      );
      return response.json(project);
    } catch (error) {
      const status = error.status || 400;
      return response.status(status).json({ message: error.message });
    }
  }

  @ApiOperation({
    summary: 'Buscar projetos do usuário',
  })
  @Get('/user/:userId')
  async listUserProjects(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Res() response: Response,
  ) {
    try {
      const project = await this.projectService.getAllUserProjects(userId);
      return response.json(project);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @ApiOperation({
    summary: 'Adicionar novo projeto dentro da plataforma',
  })
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
            userId: { type: 'number' },
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
      return response.status(400).json({ message: error.message });
    }
  }

  @ApiOperation({
    summary:
      'Atualizar informações do projeto (Apresentação do projeto na plataforma)',
  })
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

  @ApiOperation({
    summary:
      'Alternar status de projeto para ativo ou inativo (Oculta o projeto na plataforma)',
  })
  @UseGuards(AuthGuard)
  @Put('/status/:projectId')
  async toggleProjectStatus(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Req() request: AuthenticatedRequest,
    @Res() response: Response,
  ) {
    try {
      const userId = Number(request.user.sub);
      const project = await this.projectService.toggleProjectStatus(
        projectId,
        userId,
      );
      return response.json(project);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
