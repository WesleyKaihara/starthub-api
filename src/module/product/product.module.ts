import { Module } from '@nestjs/common';
import ProductService from './shared/service/product.service';
import ProductRepositorySequelize from './shared/persistence/repository/ProductRepositorySequelize';
import { ProductController } from './http/product.controller';

@Module({
  providers: [ProductService, ProductRepositorySequelize],
  controllers: [ProductController],
})
export class ProductModule {}
