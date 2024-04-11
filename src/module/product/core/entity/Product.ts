export default class Product {
  id?: number;
  name: string;
  description: string;
  value: number;

  static create(name: string, description: string, value: number): Product {
    const product = new Product();
    product.name = name;
    product.description = description;
    product.value = value;
    product.isValid();
    return product;
  }

  static update(
    id: number,
    name: string,
    description: string,
    value: number,
  ): Product {
    const product = new Product();
    product.id = id;
    product.name = name;
    product.description = description;
    product.value = value;
    product.isValid();
    return product;
  }

  static restore(
    id: number,
    name: string,
    description: string,
    value: number,
  ): Product {
    const product = new Product();
    product.id = id;
    product.name = name;
    product.description = description;
    product.value = value;
    return product;
  }

  private isValid() {
    if (this.name.length < 5) {
      throw new Error('Product Name must have at least 5 caracteres');
    }

    if (this.description.length < 10) {
      throw new Error('Product Description must have at least 10 caracteres');
    }

    if (this.value < 0) {
      throw new Error('Product value must be greater than 0');
    }
  }
}
