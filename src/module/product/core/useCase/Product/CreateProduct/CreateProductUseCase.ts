import { ProductRepository } from '@src/module/product/shared/persistence';
import { CreateProductBody } from './CreateProduct.dto';
import Product from '../../../entity/Product';

export class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) { }

  async execute(input: CreateProductBody): Promise<Product> {
    const product = Product.create(input.name, input.description, input.value);
    await this.productRepository.createProduct(product);
    return product;
  }
}
