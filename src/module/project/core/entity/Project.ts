export default class Project {
  name: string;
  description: string;
  private: boolean;

  static create(): Project {
    const project = new Project();
    return project;
  }
}
