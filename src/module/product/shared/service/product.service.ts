import { Injectable } from '@nestjs/common';

import ProductRepositorySequelize from '../persistence/repository/ProductRepositorySequelize';
import { CreateProductBody } from '../../core/useCase/Product/CreateProduct/CreateProduct.dto';
import { UpdateProductBody } from '../../core/useCase/Product/UpdateProduct/UpdateProduct.dto';
import Product from '../../core/entity/Product';

@Injectable()
export default class ProductService {
  constructor(private readonly productRepository: ProductRepositorySequelize) {}

  getProducts(): Promise<Product[]> {
    return this.productRepository.getAllProducts();
  }

  async createProduct(input: CreateProductBody): Promise<Product> {
    return this.productRepository.createProduct(input);
  }

  updateProduct(productId: number, input: UpdateProductBody): Promise<Product> {
    return this.productRepository.updateProduct(productId, input);
  }
}
