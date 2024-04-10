import Project from '@project/core/entity/Project';
import ProjectRepository from './project.repository';
import { UpdateProjectBody } from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProject.dto';

class InMemoryProjectRepository implements ProjectRepository {
  private projects: Project[];
  private nextId: number;

  constructor() {
    this.projects = [];
    this.nextId = 1;
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projects;
  }

  async findProjectById(projectId: number): Promise<Project | null> {
    return this.projects.find((project) => project.id === projectId) || null;
  }

  async createProject(createProjectDto: any): Promise<Project> {
    const project = Project.create(
      createProjectDto.name,
      createProjectDto.description,
      createProjectDto.private,
    );
    project.id = this.nextId++;
    this.projects.push(project);
    return project;
  }

  async updateProject(
    projectId: number,
    updateProjectDto: UpdateProjectBody,
  ): Promise<Project | null> {
    const projectIndex = this.projects.findIndex(
      (project) => project.id === projectId,
    );
    if (projectIndex !== -1) {
      const updatedProject = Project.restore(
        projectId,
        updateProjectDto.name,
        updateProjectDto.description,
        updateProjectDto.private,
      );
      updatedProject.id = projectId;
      this.projects[projectIndex] = updatedProject;
      return updatedProject;
    }
    return null;
  }
}

export default InMemoryProjectRepository;
