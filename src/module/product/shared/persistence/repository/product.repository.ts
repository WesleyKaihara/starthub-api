import UserAbility from '@identity/core/entity/UserAbility';

import { CreateProductDto } from '@src/module/product/core/useCase/Product/CreateProductUseCase/CreateProduct.dto';
import Product from '@src/module/product/core/entity/Product';
import { UpdateProductDto } from '@src/module/product/core/useCase/Product/UpdateProductUseCase/UpdateProduct.dto';

export default interface ProductRepository {
  getAllProducts(): Promise<UserAbility[]>;
  createProduct(createProductDto: CreateProductDto): Promise<Product>;
  updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product>;
}
