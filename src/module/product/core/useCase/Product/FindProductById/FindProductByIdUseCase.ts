import ProductRepository from '@src/module/product/shared/persistence/repository/product.repository';
import Product from '../../../entity/Product';

export default class FindProductById {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: number): Promise<Product> {
    const product = await this.productRepository.findProductById(productId);
    return product;
  }
}