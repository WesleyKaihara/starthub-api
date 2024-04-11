import { CreateProductBody } from '@src/module/product/core/useCase/Product/CreateProduct/CreateProduct.dto';
import Product from '@src/module/product/core/entity/Product';
import { UpdateProductBody } from '@src/module/product/core/useCase/Product/UpdateProduct/UpdateProduct.dto';

export default interface ProductRepository {
  getAllProducts(): Promise<Product[]>;
  findProductById(productId: number): Promise<Product>;
  createProduct(createProductBody: CreateProductBody): Promise<Product>;
  updateProduct(id: number, input: UpdateProductBody): Promise<Product>;
}
