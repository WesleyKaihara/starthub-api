import ProductRepository from '@src/module/product/shared/persistence/repository/product.repository';
import Product from '../../../entity/Product';
import { UpdateProductDto } from './UpdateProduct.dto';

export default class UpdateProduct {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(productId: number, input: UpdateProductDto): Promise<Product> {
    const product = Product.update(
      input.name,
      input.description,
      input.value,
    );
    await this.productRepository.updateProduct(productId, product);
    return product;
  }
}
