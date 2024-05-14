import Project from '@project/core/entity/Project';

class ProjectBuilder {
  private id: number;
  private name: string;
  private description: string;
  private isPrivate: boolean;
  private userId: number;

  constructor() {
    this.id = 1;
    this.name = 'Default Project Name';
    this.description = 'Default Project Description';
    this.isPrivate = false;
  }

  withName(name: string): ProjectBuilder {
    this.name = name;
    return this;
  }

  withDescription(description: string): ProjectBuilder {
    this.description = description;
    return this;
  }

  withPrivate(isPrivate: boolean): ProjectBuilder {
    this.isPrivate = isPrivate;
    return this;
  }

  build(): Project {
    return Project.restore(
      this.id,
      this.name,
      this.description,
      this.isPrivate,
      this.userId,
    );
  }
}

export default ProjectBuilder;
