export default class User {
  id?: number;
  name: string;
  email: string;
  password: string;

  static create(name: string, email: string, password: string): User {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.isValid();
    return user;
  }

  static update(
    id: number,
    name: string,
    email: string,
    password: string,
  ): User {
    const user = new User();
    user.id = id;
    user.name = name;
    user.email = email;
    user.password = password;
    user.isValid();
    return user;
  }

  static restore(
    id: number,
    name: string,
    email: string,
    password: string,
  ): User {
    const user = new User();
    user.id = id;
    user.name = name;
    user.email = email;
    user.password = password;
    return user;
  }

  private isValid() {
    if (this.name.length < 5) {
      throw new Error('User Name must have at least 3 characters');
    }
  }
}
