import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import ProductService from '../shared/service/product.service';
import { CreateProductBody } from '../core/useCase/Product/CreateProduct/CreateProduct.dto';
import { UpdateProductBody } from '../core/useCase/Product/UpdateProduct/UpdateProduct.dto';

@Controller('/product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Res() response: Response) {
    try {
      const products = await this.productService.getProducts();
      return response.json(products);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  @Get('/:productId')
  async findProductById(
    @Param('productId', new ParseIntPipe()) productId: number,
    @Res() response: Response,
  ) {
    try {
      const product = await this.productService.findProductById(
        productId,
      );
      return response.json(product);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post()
  async createProduct(
    @Body() input: CreateProductBody,
    @Res() response: Response,
  ) {
    try {
      const ability = await this.productService.createProduct(input);
      return response.json(ability);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Put('/:productId')
  async updateProductById(
    @Param('productId', new ParseIntPipe()) productId: number,
    @Body() input: UpdateProductBody,
    @Res() response: Response,
  ) {
    try {
      const updatedProduct = await this.productService.updateProduct(
        productId,
        input,
      );
      return response.json(updatedProduct);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
