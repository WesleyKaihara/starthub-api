import { ProductRepository, ProductRepositoryInMemory } from '@product/shared/persistence';
import { CreateProductBody } from '../../../Product/CreateProduct/CreateProduct.dto';

import { CreateProduct } from '@product/core/useCase';

describe('CreateProduct', () => {
  let createProduct: CreateProduct;
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new ProductRepositoryInMemory();
    createProduct = new CreateProduct(productRepository);
  });

  it('should create a product', async () => {
    const input: CreateProductBody = {
      name: 'Test Product',
      description: 'This is a test product.',
      value: 30,
    };

    const product = await createProduct.execute(input);

    expect(product).toBeDefined();
    expect(product.name).toBe('Test Product');
    expect(product.description).toBe('This is a test product.');
    expect(product.value).toBe(30);
  });

  it('should throw error if product name is too short', async () => {
    const input: CreateProductBody = {
      name: 'Test',
      description: 'This is a test product.',
      value: 20,
    };

    await expect(createProduct.execute(input)).rejects.toThrow(
      /Product Name must have at least 5/,
    );
  });

  it('should throw error if product description is too short', async () => {
    const input: CreateProductBody = {
      name: 'Test Product',
      description: 'Test',
      value: 20,
    };

    await expect(createProduct.execute(input)).rejects.toThrow(
      /Product Description must have at least 10/,
    );
  });
});
