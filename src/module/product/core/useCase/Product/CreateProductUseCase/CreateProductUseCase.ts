import ProductRepository from '@src/module/product/shared/persistence/repository/product.repository';
import { CreateProductDto } from './CreateProduct.dto';
import Product from '../../../entity/Product';

export default class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: CreateProductDto): Promise<Product> {
    const product = Product.create(input.name, input.description, input.value);
    await this.productRepository.createProduct(product);
    return product;
  }
}
