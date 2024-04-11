import Product from '../../entity/Product';

class ProductBuilder {
  private id: number;
  private name: string;
  private description: string;
  private value: number;

  constructor() {
    this.id = 1;
    this.name = 'Default Product Name';
    this.description = 'Default Product Description';
    this.value = 30;
  }

  withName(name: string): ProductBuilder {
    this.name = name;
    return this;
  }

  withDescription(description: string): ProductBuilder {
    this.description = description;
    return this;
  }

  withValue(value: number): ProductBuilder {
    this.value = value;
    return this;
  }

  build(): Product {
    return Product.restore(this.id, this.name, this.description, this.value);
  }
}

export default ProductBuilder;
