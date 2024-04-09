import { Injectable } from '@nestjs/common';

import Product from '@src/module/product/core/entity/Product';
import ProductModel from '../model/ProductModel';
import ProductRepository from './product.repository';
import { UpdateProductDto } from '@src/module/product/core/useCase/Product/UpdateProductUseCase/UpdateProduct.dto';
import { CreateProductDto } from '@src/module/product/core/useCase/Product/CreateProductUseCase/CreateProduct.dto';

@Injectable()
export default class ProductRepositorySequelize implements ProductRepository {
  public getAllProducts(): Promise<Product[]> {
    return ProductModel.findAll()
      .then((products) => {
        return products as Product[];
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  public async findProductById(id: number): Promise<Product> {
    return await ProductModel.findOne({
      where: { id },
    });
  }

  public createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return ProductModel.create(createProductDto as any);
  }

  public async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const [rowAffected] = await ProductModel.update(
      { ...updateProductDto },
      { where: { id } },
    );

    if (rowAffected > 0) {
      return await ProductModel.findByPk(id);
    } else {
      throw new Error(`Unable to find a product with id ${id}`);
    }
  }
}
