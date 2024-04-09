import { Injectable } from '@nestjs/common';

import ProductRepositorySequelize from '../persistence/repository/ProductRepositorySequelize';
import { CreateProductDto } from '../../core/useCase/Product/CreateProductUseCase/CreateProduct.dto';
import { UpdateProductDto } from '../../core/useCase/Product/UpdateProductUseCase/UpdateProduct.dto';
import Product from '../../core/entity/Product';

@Injectable()
export default class ProductService {
  constructor(private readonly productRepository: ProductRepositorySequelize) {}

  getProducts(): Promise<Product[]> {
    return this.productRepository.getAllProducts();
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(createProductDto);
  }

  updateProduct(
    userAbilityId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productRepository.updateProduct(
      userAbilityId,
      updateProductDto,
    );
  }
}
