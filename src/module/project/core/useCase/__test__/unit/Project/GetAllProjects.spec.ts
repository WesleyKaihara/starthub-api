import Project from '@project/core/entity/Project';
import GetAllProjects from '@project/core/useCase/Project/GetAllProjectsUseCase/GetAllProjectsUseCase';
import InMemoryProjectRepository from '@project/shared/persistence/repository/ProjectRepository/ProjectRepositoryInMemory';
import ProjectRepository from '@project/shared/persistence/repository/ProjectRepository/project.repository';

describe('GetAllProjects', () => {
  let getAllProjects: GetAllProjects;
  let projectRepository: ProjectRepository;

  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository();
    getAllProjects = new GetAllProjects(projectRepository);
  });

  it('should get all projects', async () => {
    const project1 = Project.create('Project 1', 'Description 1', false);
    const project2 = Project.create('Project 2', 'Description 2', true);
    await projectRepository.createProject(project1);
    await projectRepository.createProject(project2);

    const projects = await getAllProjects.execute();

    expect(projects).toHaveLength(2);
    expect(projects[0].name).toBe('Project 1');
    expect(projects[0].description).toBe('Description 1');
    expect(projects[0].private).toBe(false);

    expect(projects[1].name).toBe('Project 2');
    expect(projects[1].description).toBe('Description 2');
    expect(projects[1].private).toBe(true);
  });
});
