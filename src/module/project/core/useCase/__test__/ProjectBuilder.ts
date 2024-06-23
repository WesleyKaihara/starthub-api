import Project from '@project/core/entity/Project';

class ProjectBuilder {
  private id: number;
  private name: string;
  private description: string;
  private ative: boolean;
  private userId: number;

  constructor() {
    this.id = 1;
    this.name = 'Default Project Name';
    this.description = 'Default Project Description';
    this.ative = false;
  }

  withUserId(userId: number) {
    this.userId = userId;
    return this;
  }

  withName(name: string): ProjectBuilder {
    this.name = name;
    return this;
  }

  withDescription(description: string): ProjectBuilder {
    this.description = description;
    return this;
  }

  withAtive(ative: boolean): ProjectBuilder {
    this.ative = ative;
    return this;
  }

  build(): Project {
    return Project.restore(
      this.id,
      this.name,
      this.description,
      this.ative,
      this.userId,
    );
  }
}

export default ProjectBuilder;
