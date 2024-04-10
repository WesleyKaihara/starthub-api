import UpdateProject from '@project/core/useCase/Project/UpdateProjectUseCase/UpdateProjectUseCase';
import ProjectRepository from '@project/shared/persistence/repository/ProjectRepository/project.repository';
import ProjectBuilder from '../../ProjectBuilder';
import InMemoryProjectRepository from '@project/shared/persistence/repository/ProjectRepository/ProjectRepositoryInMemory';

describe('UpdateProject', () => {
  let updateProject: UpdateProject;
  let projectRepository: ProjectRepository;

  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository();
    updateProject = new UpdateProject(projectRepository);
  });

  it('should update a project', async () => {
    const projectId = 1;
    const project = new ProjectBuilder()
      .withName('Project Name')
      .withDescription('Project Description')
      .withPrivate(false)
      .build();
    await projectRepository.createProject(project);

    const updateProjectDto = new ProjectBuilder()
      .withName('Updated Project Name')
      .withDescription('Updated Project Description')
      .withPrivate(true)
      .build();

    const updatedProject = await updateProject.execute(
      projectId,
      updateProjectDto,
    );

    expect(updatedProject).toBeDefined();
    expect(updatedProject.name).toBe('Updated Project Name');
    expect(updatedProject.description).toBe('Updated Project Description');
    expect(updatedProject.private).toBe(true);
  });

  it('should throw error if project name is too short', async () => {
    const projectId = 1;
    const updateProjectDto = new ProjectBuilder()
      .withName('Test')
      .withDescription('Updated Project Description')
      .withPrivate(true)
      .build();

    await expect(
      updateProject.execute(projectId, updateProjectDto),
    ).rejects.toThrow(/Project Name must have at least 5/);
  });

  it('should throw error if project description is too short', async () => {
    const projectId = 1;
    const updateProjectDto = new ProjectBuilder()
      .withName('Updated Project Name')
      .withDescription('Test')
      .withPrivate(true)
      .build();

    await expect(
      updateProject.execute(projectId, updateProjectDto),
    ).rejects.toThrow(/Project Description must have at least 10/);
  });
});
