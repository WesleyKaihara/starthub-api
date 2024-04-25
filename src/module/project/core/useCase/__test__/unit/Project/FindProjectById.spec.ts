import { ProjectRepository, ProjectRepositoryInMemory } from '@project/shared/persistence';
import ProjectBuilder from '../../ProjectBuilder';
import { FindProjectById } from '@project/core/useCase';

describe('FindProjectById', () => {
  let findProjectById: FindProjectById;
  let projectRepository: ProjectRepository;

  beforeEach(() => {
    projectRepository = new ProjectRepositoryInMemory();
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

  it('should return exeption if project is not found', async () => {
    const projectId = 999;

    expect(findProjectById.execute(projectId))
      .rejects
      .toThrow(`Project with id ${projectId} not found`)
  });
});
