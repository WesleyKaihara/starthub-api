import { CreateProjectBody } from '@project/core/useCase/Project/CreateProjectUseCase/CreateProject.dto';
import CreateProject from '@project/core/useCase/Project/CreateProjectUseCase/CreateProjectUseCase';
import InMemoryProjectRepository from '@project/shared/persistence/repository/ProjectRepository/ProjectRepositoryInMemory';
import ProjectRepository from '@project/shared/persistence/repository/ProjectRepository/project.repository';

describe('CreateProject', () => {
  let createProject: CreateProject;
  let projectRepository: ProjectRepository;

  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository();
    createProject = new CreateProject(projectRepository);
  });

  it('should create a project', async () => {
    const input: CreateProjectBody = {
      name: 'Test Project',
      description: 'This is a test project.',
      private: false,
    };

    const project = await createProject.execute(input);

    expect(project).toBeDefined();
    expect(project.name).toBe('Test Project');
    expect(project.description).toBe('This is a test project.');
    expect(project.private).toBe(false);
  });

  it('should throw error if project name is too short', async () => {
    const input: CreateProjectBody = {
      name: 'Test',
      description: 'This is a test project.',
      private: false,
    };

    await expect(createProject.execute(input)).rejects.toThrow(
      /Project Name must have at least 5/,
    );
  });

  it('should throw error if project description is too short', async () => {
    const input: CreateProjectBody = {
      name: 'Test Project',
      description: 'Test',
      private: false,
    };

    await expect(createProject.execute(input)).rejects.toThrow(
      /Project Description must have at least 10/,
    );
  });
});
