import { Injectable } from '@nestjs/common';

import Project from '@project/core/entity/project.entity';
import ProjectModel from '../model/project.model';
import ProjectRepository from './project.repository';
import { CreateProjectDto } from '@project/http/dto/project/create-project.dto';
import { UpdateProjectDto } from '@project/http/dto/project/update-project.dto';

@Injectable()
export default class ProjectRepositorySequelize implements ProjectRepository {
  public getAllProjects(): Promise<Project[]> {
    return ProjectModel.findAll()
      .then((projects) => {
        return projects as Project[];
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  public async findProjectById(id: number): Promise<Project> {
    return await ProjectModel.findOne({
      where: { id },
    });
  }

  public createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    return ProjectModel.create(createProjectDto as any);
  }

  public async updateProject(
    id: number,
    atualizarProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const [linhasAfetadas] = await ProjectModel.update(
      { ...atualizarProjectDto },
      { where: { id } },
    );

    if (linhasAfetadas > 0) {
      return await ProjectModel.findByPk(id);
    } else {
      throw new Error(`Unable to find a project type with id ${id}`);
    }
  }
}
