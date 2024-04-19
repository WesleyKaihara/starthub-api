import { Injectable } from '@nestjs/common';

import Product from '@src/module/product/core/entity/Product';
import ProductModel from '../model/ProductModel';
import { ProductRepository } from './product.repository';
import { UpdateProductBody } from '@src/module/product/core/useCase/Product/UpdateProduct/UpdateProduct.dto';
import { CreateProductBody } from '@src/module/product/core/useCase/Product/CreateProduct/CreateProduct.dto';

@Injectable()
export class ProductRepositorySequelize implements ProductRepository {
  async getAllProducts(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map((product) =>
      Product.restore(
        product.id,
        product.name,
        product.description,
        product.value,
      ),
    );
  }

  public async findProductById(id: number): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return Product.restore(
      product.id,
      product.name,
      product.description,
      product.value,
    );
  }

  async createProduct(input: CreateProductBody): Promise<Product> {
    const product: ProductModel = await ProductModel.create({
      name: input.name,
      description: input.description,
      private: input.value,
    });

    return Product.restore(
      product.id,
      product.name,
      product.description,
      product.value,
    );
  }

  public async updateProduct(
    id: number,
    input: UpdateProductBody,
  ): Promise<Product> {
    const [rowsAffected] = await ProductModel.update(
      { ...input },
      { where: { id } },
    );

    if (rowsAffected > 0) {
      const product = await ProductModel.findByPk(id);
      if (!product) {
        throw new Error(`Product with id ${id} not found after update`);
      }
      return Product.restore(
        product.id,
        product.name,
        product.description,
        product.value,
      );
    } else {
      throw new Error(`Unable to update product with id ${id}`);
    }
  }
}
