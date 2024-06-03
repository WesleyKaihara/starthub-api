import { Injectable } from '@nestjs/common';

import Project from '@project/core/entity/Project';
import ProjectModel from '../../model/ProjectModel';

import { CreateProjectBody } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';
import { UpdateProjectBody } from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProject.dto';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectRepositorySequelize implements ProjectRepository {
  async getAllProjects(): Promise<Project[]> {
    const projects = await ProjectModel.findAll();

    return projects.map((project) =>
      Project.restore(
        project.id,
        project.name,
        project.description,
        project.private,
        project.userId,
        project.image,
      ),
    );
  }

  async getAllUserProjects(userId: number): Promise<Project[]> {
    const projects = await ProjectModel.findAll({
      where: { userId },
    });

    return projects.map((project) =>
      Project.restore(
        project.id,
        project.name,
        project.description,
        project.private,
        project.userId,
        project.image,
      ),
    );
  }

  async findProjectById(id: number): Promise<Project> {
    const project = await ProjectModel.findOne({ where: { id } });
    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }
    return Project.restore(
      project.id,
      project.name,
      project.description,
      project.private,
      project.userId,
      project.image,
    );
  }

  async createProject(input: CreateProjectBody): Promise<Project> {
    const project: ProjectModel = await ProjectModel.create({
      name: input.name,
      description: input.description,
      private: input.private,
      image: input.image,
      userId: input.userId,
    });

    return Project.restore(
      project.id,
      project.name,
      project.description,
      project.private,
      project.userId,
      project.image,
    );
  }

  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectBody,
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
        project.id,
        project.name,
        project.description,
        project.private,
        project.userId,
        project.image,
      );
    } else {
      throw new Error(`Unable to update project with id ${id}`);
    }
  }
}
