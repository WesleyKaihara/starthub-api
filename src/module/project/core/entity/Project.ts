export default class Project {
  name: string;
  description: string;
  private: boolean;

  static set(name: string, description: string, _private: boolean): Project {
    const project = new Project();
    project.name = name;
    project.description = description;
    project.private = _private;
    project.isValid();
    return project;
  }

  static restore(name: string, description: string, _private: boolean): Project {
    const project = new Project();
    project.name = name;
    project.description = description;
    project.private = _private;
    return project;
  }

  private isValid() {
    if(this.name.length < 5) {
      throw new Error("Project Name must have at least 5 caracteres");
    }

    if(this.description.length < 10) {
      throw new Error("Project Description must have at least 10 caracteres");
    }
  }
}
