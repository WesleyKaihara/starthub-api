import Project from '@project/core/entity/Project';
import { CreateProjectDto } from './CreateProject.dto';
import ProjectRepository from '@project/shared/persistence/repository/project.repository';

export default class CreateProject {
    constructor (
        private readonly projectRepository: ProjectRepository
    ) {}

    async execute(input: CreateProjectDto): Promise<Project> {
        const banner = Project.create();
        await this.projectRepository.createProject(banner);
        return banner;
    }
}
