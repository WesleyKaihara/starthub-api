import ProjectBuilder from '../../ProjectBuilder';

import { UpdateProject } from '@project/core/useCase';
import {
  ProjectRepository,
  ProjectRepositoryInMemory,
} from '@project/shared/persistence';

describe('UpdateProject', () => {
  let updateProject: UpdateProject;
  let projectRepository: ProjectRepository;

  beforeEach(() => {
    projectRepository = new ProjectRepositoryInMemory();
    updateProject = new UpdateProject(projectRepository);
  });

  it('should update a project', async () => {
    const projectId = 1;
    const project = new ProjectBuilder()
      .withName('Project Name')
      .withDescription('Project Description')
      .withAtive(false)
      .build();
    await projectRepository.createProject(project);

    const updateProjectDto = new ProjectBuilder()
      .withName('Updated Project Name')
      .withDescription('Updated Project Description')
      .withAtive(true)
      .build();

    const updatedProject = await updateProject.execute(
      projectId,
      updateProjectDto,
    );

    expect(updatedProject).toBeDefined();
    expect(updatedProject.name).toBe('Updated Project Name');
    expect(updatedProject.description).toBe('Updated Project Description');
    expect(updatedProject.ative).toBe(true);
  });

  it('should throw error if project name is too short', async () => {
    const projectId = 1;
    const updateProjectDto = new ProjectBuilder()
      .withName('Test')
      .withDescription('Updated Project Description')
      .withAtive(true)
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
      .withAtive(true)
      .build();

    await expect(
      updateProject.execute(projectId, updateProjectDto),
    ).rejects.toThrow(/Project Description must have at least 10/);
  });
});
