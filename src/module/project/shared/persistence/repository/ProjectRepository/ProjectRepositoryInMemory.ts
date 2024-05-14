import Project from '@project/core/entity/Project';
import { UpdateProjectBody } from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProject.dto';
import { ProjectRepository } from './project.repository';
import { CreateProjectBody } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';

export class ProjectRepositoryInMemory implements ProjectRepository {
  private projects: Project[];
  private nextId: number;

  constructor() {
    this.projects = [];
    this.nextId = 1;
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getAllUserProjects(userId: number): Promise<Project[]> {
    const projects = this.projects.filter(
      (project) => project.userId === userId,
    );
    if (projects.length === 0) {
      throw new Error(`Projects for user ${userId} not found`);
    }
    return projects;
  }

  async findProjectById(projectId: number): Promise<Project> {
    const project = this.projects.find((project) => project.id === projectId);
    if (!project) {
      throw new Error(`Project with id ${projectId} not found`);
    }
    return project;
  }

  async createProject(input: CreateProjectBody): Promise<Project> {
    const project = Project.create(
      input.name,
      input.description,
      input.private,
      input.userId,
      input.image,
    );
    project.id = this.nextId++;
    this.projects.push(project);
    return project;
  }

  async updateProject(
    projectId: number,
    input: UpdateProjectBody,
  ): Promise<Project | null> {
    const projectIndex = this.projects.findIndex(
      (project) => project.id === projectId,
    );
    if (projectIndex !== -1) {
      const updatedProject = Project.restore(
        projectId,
        input.name,
        input.description,
        input.private,
        input.userId,
        input.image,
      );
      updatedProject.id = projectId;
      this.projects[projectIndex] = updatedProject;
      return updatedProject;
    }
    return null;
  }
}
