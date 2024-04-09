import { Injectable } from '@nestjs/common';

import Project from '@project/core/entity/Project';
import ProjectModel from '../../model/ProjectModel';
import ProjectRepository from './project.repository';

import { CreateProjectDto } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';
import { UpdateProjectDto } from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProject.dto';

@Injectable()
export default class ProjectRepositorySequelize implements ProjectRepository {
  async getAllProjects(): Promise<Project[]> {
    const projects = await ProjectModel.findAll();

    return projects.map((project) =>
      Project.restore(project.name, project.description, project.private),
    );
  }

  async findProjectById(id: number): Promise<Project> {
    const project = await ProjectModel.findOne({ where: { id } });
    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }
    return Project.restore(project.name, project.description, project.private);
  }

  async createProject(input: CreateProjectDto): Promise<Project> {
    const project: ProjectModel = await ProjectModel.create({
      name: input.name,
      description: input.description,
      private: input.private,
    });

    return Project.restore(project.name, project.description, project.private);
  }

  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const [rowsAffected] = await ProjectModel.update(
      { ...updateProjectDto },
      { where: { id } },
    );

    if (rowsAffected > 0) {
      const project = await ProjectModel.findByPk(id);
      if (!project) {
        throw new Error(`Project with id ${id} not found after update`);
      }
      return Project.restore(
        project.name,
        project.description,
        project.private,
      );
    } else {
      throw new Error(`Unable to update project with id ${id}`);
    }
  }
}
