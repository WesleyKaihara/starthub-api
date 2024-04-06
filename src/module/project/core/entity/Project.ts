export default class Project {
  name: string;
  description: string;
  private: boolean;

  static create(name: string, description: string, _private: boolean): Project {
    const project = new Project();
    project.name = name;
    project.description = description;
    project.private = _private;
    return project;
  }

  static update(name: string, description: string, _private: boolean): Project {
    const project = new Project();
    project.name = name;
    project.description = description;
    project.private = _private;
    return project;
  }
}
