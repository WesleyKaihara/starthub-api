import Project from '@project/core/entity/Project';
import { Builder } from 'test/Builder';
import CreateProject from '../Project/CreateProjectUseCase/CreateProjectUseCase';
import ProjectRepository from '@project/shared/persistence/repository/ProjectRepository/project.repository';
import { CreateProjectDto } from '../Project/CreateProjectUseCase/CreateProject.dto';


export class ProjectBuilder implements Builder<Project>{
  protected project;

  constructor() {
    this.project = {
      name: "",
      description: "",
      private: false
    }
  }

  create() {
    const projectData: CreateProjectDto = {
      name: this.project.name,
      description: this.project.description,
      private: this.project.private
    }
    return this;
  }

  build() {
    return this.project;
  }
}