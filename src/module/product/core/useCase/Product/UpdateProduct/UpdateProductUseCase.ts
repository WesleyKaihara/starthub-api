import ProductRepository from '@src/module/product/shared/persistence/repository/product.repository';
import Product from '../../../entity/Product';
import { UpdateProductBody } from './UpdateProduct.dto';

export class UpdateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: number, input: UpdateProductBody): Promise<Product> {
    const product = Product.update(
      productId,
      input.name,
      input.description,
      input.value,
    );
    await this.productRepository.updateProduct(productId, product);
    return product;
  }
}
