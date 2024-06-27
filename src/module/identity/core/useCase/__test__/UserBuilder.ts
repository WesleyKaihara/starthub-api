import User, { Cpf } from '@identity/core/entity/User';

class UserBuilder {
  private id: number;
  private name: string;
  private cpf: Cpf;
  private email: string;
  private password: string;

  constructor() {
    this.id = 1;
    this.name = 'Default User Name';
    this.cpf = new Cpf('422.209.770-56');
    this.email = 'user@email.com';
    this.password = 'SecReT123$';
  }

  withName(name: string): UserBuilder {
    this.name = name;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }

  withCpf(cpf: string): UserBuilder {
    this.cpf = new Cpf(cpf);
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.password = password;
    return this;
  }

  build(): User {
    return User.restore(
      this.id,
      this.name,
      this.cpf.getCpf(),
      this.email,
      this.password,
    );
  }
}

export default UserBuilder;
