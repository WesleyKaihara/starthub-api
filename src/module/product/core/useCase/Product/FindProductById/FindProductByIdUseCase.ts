import { ProductRepository } from '@src/module/product/shared/persistence';
import Product from '../../../entity/Product';

export class FindProductById {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: number): Promise<Product> {
    const product = await this.productRepository.findProductById(productId);
    return product;
  }
}
