export default class Project {
  id?: number;
  name: string;
  description: string;
  private: boolean;
  userId: number;
  image?: string;

  static create(
    name: string,
    description: string,
    _private: boolean,
    userId: number,
    image?: string,
  ): Project {
    const project = new Project();
    project.name = name;
    project.description = description;
    project.private = _private;
    project.image = image;
    project.userId = userId;
    project.isValid();
    return project;
  }

  static update(
    id: number,
    name: string,
    description: string,
    _private: boolean,
    userId: number,
    image?: string,
  ): Project {
    const project = new Project();
    project.id = id;
    project.name = name;
    project.description = description;
    project.private = _private;
    project.image = image;
    project.userId = userId;
    project.isValid();
    return project;
  }

  static restore(
    id: number,
    name: string,
    description: string,
    _private: boolean,
    userId: number,
    image?: string,
  ): Project {
    const project = new Project();
    project.id = id;
    project.name = name;
    project.description = description;
    project.private = _private;
    project.userId = userId;
    project.image = image;
    return project;
  }

  private isValid() {
    if (this.name.length < 5) {
      throw new Error('Project Name must have at least 5 characters');
    }

    if (this.description.length < 10) {
      throw new Error('Project Description must have at least 10 characters');
    }
  }
}
