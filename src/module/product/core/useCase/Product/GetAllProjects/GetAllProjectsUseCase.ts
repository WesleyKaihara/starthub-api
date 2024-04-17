import ProductRepository from '@src/module/product/shared/persistence/repository/product.repository';
import Product from '../../../entity/Product';

export class GetAllProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.getAllProducts();
    return products;
  }
}
