import Product from '@src/module/product/core/entity/Product';
import ProductRepository from './product.repository';
import { UpdateProductBody } from '@src/module/product/core/useCase/Product/UpdateProduct/UpdateProduct.dto';
import { CreateProductBody } from '@src/module/product/core/useCase/Product/CreateProduct/CreateProduct.dto';

class InMemoryProductRepository implements ProductRepository {
  private products: Product[];
  private nextId: number;

  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async findProductById(productId: number): Promise<Product | null> {
    return this.products.find((product) => product.id === productId) || null;
  }

  async createProduct(input: CreateProductBody): Promise<Product> {
    const product = Product.create(input.name, input.description, input.value);
    product.id = this.nextId++;
    this.products.push(product);
    return product;
  }

  async updateProduct(
    productId: number,
    input: UpdateProductBody,
  ): Promise<Product | null> {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId,
    );
    if (productIndex !== -1) {
      const updatedProduct = Product.restore(
        productId,
        input.name,
        input.description,
        input.value,
      );
      updatedProduct.id = productId;
      this.products[productIndex] = updatedProduct;
      return updatedProduct;
    }
    return null;
  }
}

export default InMemoryProductRepository;
