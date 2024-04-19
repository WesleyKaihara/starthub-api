import { Injectable } from '@nestjs/common';

import { ProductRepositorySequelize } from '../persistence';
import Product from '../../core/entity/Product';
import { CreateProduct, CreateProductBody, FindProductById, GetAllProducts, UpdateProduct, UpdateProductBody } from '@product/core/useCase';

@Injectable()
export default class ProductService {
  constructor(private readonly productRepository: ProductRepositorySequelize) { }

  getProducts(): Promise<Product[]> {
    const getAllDiscussions = new GetAllProducts(this.productRepository);
    return getAllDiscussions.execute();
  }

  async findProductById(
    productId: number
  ): Promise<Product> {
    const findProductById = new FindProductById(this.productRepository);
    return findProductById.execute(productId);
  }

  async createProduct(
    input: CreateProductBody,
  ): Promise<Product> {
    const createProduct = new CreateProduct(this.productRepository);
    return createProduct.execute(input);
  }

  updateProduct(
    discussionId: number,
    input: UpdateProductBody,
  ): Promise<Product> {
    const updateDiscussion = new UpdateProduct(this.productRepository);
    return updateDiscussion.execute(discussionId, input);
  }

}
