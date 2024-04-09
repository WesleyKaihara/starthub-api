export default class Product {
  name: string;
  description: string;
  value: number;

  static create(name: string, description: string, value: number): Product {
    const product = new Product();
    product.name = name;
    product.description = description;
    product.value = value;
    return product;
  }

  static update(name: string, description: string, value: number): Product {
    const product = new Product();
    product.name = name;
    product.description = description;
    product.value = value;
    return product;
  }
}
