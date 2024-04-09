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
import { ZodError } from 'zod';
import ProductService from '../shared/service/product.service';
import {
  CreateProductDto,
  CreateProductDtoSchema,
} from '../core/useCase/Product/CreateProductUseCase/CreateProduct.dto';
import {
  UpdateProductDto,
  UpdateProductDtoSchema,
} from '../core/useCase/Product/UpdateProductUseCase/UpdateProduct.dto';

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
      return response.status(500).json({ mensagem: error.message });
    }
  }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() response: Response,
  ) {
    try {
      const validSchema = CreateProductDtoSchema.parse(
        createProductDto,
      ) as CreateProductDto;
      const ability = await this.productService.createProduct(validSchema);
      return response.json(ability);
    } catch (error) {
      if (error instanceof ZodError) {
        return response
          .status(400)
          .json({ mensagem: 'Invalid Schema', errors: error.errors });
      } else {
        return response.status(500).json({ mensagem: error.message });
      }
    }
  }

  @Put('/:productId')
  async updateProductById(
    @Param('productId', new ParseIntPipe()) productId: number,
    @Body() updateProductDto: UpdateProductDto,
    @Res() response: Response,
  ) {
    try {
      const validSchema = UpdateProductDtoSchema.parse(
        updateProductDto,
      ) as UpdateProductDto;
      const updatedProduct = await this.productService.updateProduct(
        productId,
        validSchema,
      );
      return response.json(updatedProduct);
    } catch (error) {
      if (error instanceof ZodError) {
        return response
          .status(400)
          .json({ mensagem: 'Invalid Schema', errors: error.errors });
      } else {
        return response.status(500).json({ mensagem: error.message });
      }
    }
  }
}
