import ProjectRepository from '@project/shared/persistence/repository/ProjectRepository/project.repository';
import FindProjectById from '@project/core/useCase/Project/FindProjectByIdUseCase/FindProjectProjectByIdUseCase';
import ProjectBuilder from '../../ProjectBuilder';
import InMemoryProjectRepository from '@project/shared/persistence/repository/ProjectRepository/ProjectRepositoryInMemory';

describe('FindProjectById', () => {
  let findProjectById: FindProjectById;
  let projectRepository: ProjectRepository;

  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository();
    findProjectById = new FindProjectById(projectRepository);
  });

  it('should find project by id', async () => {
    const projectId = 1;
    const expectedProject = new ProjectBuilder()
      .withName('Project 1')
      .withDescription('Description 1')
      .withPrivate(false)
      .build();
    await projectRepository.createProject(expectedProject);

    const project = await findProjectById.execute(projectId);

    expect(project).toEqual(expectedProject);
  });

  it('should return null if project is not found', async () => {
    const projectId = 2;
    const project = await findProjectById.execute(projectId);

    expect(project).toBeNull();
  });
});
