export class Cpf {
  private value: string;

  constructor(cpf: string) {
    this.value = cpf.replace(/\D/g, '');
  }

  public isValid(): boolean {
    const cpf = this.value;

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    const calculateCheckDigit = (cpf: string, factor: number): number => {
      let sum = 0;
      for (let i = 0; i < factor - 1; i++) {
        sum += parseInt(cpf[i]) * (factor - i);
      }
      const remainder = (sum * 10) % 11;
      return remainder === 10 || remainder === 11 ? 0 : remainder;
    };

    const firstCheckDigit = calculateCheckDigit(cpf, 10);
    const secondCheckDigit = calculateCheckDigit(cpf, 11);

    return (
      firstCheckDigit === parseInt(cpf[9]) &&
      secondCheckDigit === parseInt(cpf[10])
    );
  }

  public format(): string {
    const cpf = this.value;
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  public getCpf(): string {
    return this.value;
  }
}

export default class User {
  id?: number;
  name: string;
  cpf: Cpf;
  email: string;
  password?: string;

  static create(
    name: string,
    cpf: string,
    email: string,
    password: string,
  ): User {
    const user = new User();
    user.name = name;
    user.cpf = new Cpf(cpf);
    user.email = email;
    user.password = password;
    user.isValid();
    return user;
  }

  static update(id: number, cpf: string, name: string): User {
    const user = new User();
    user.id = id;
    user.name = name;
    user.cpf = new Cpf(cpf);
    user.isValid();
    return user;
  }

  static restore(
    id: number,
    name: string,
    cpf: string,
    email?: string,
    password?: string,
  ): User {
    const user = new User();
    user.id = id;
    user.name = name;
    user.cpf = new Cpf(cpf);
    user.email = email;
    user.password = password;
    return user;
  }

  private isValid() {
    if (this.name.length < 5) {
      throw new Error('User Name must have at least 3 characters');
    }

    if (!this.cpf.isValid()) {
      throw new Error('Invalid Cpf');
    }
  }
}
