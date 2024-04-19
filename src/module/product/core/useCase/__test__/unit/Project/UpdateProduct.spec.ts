import { ProductRepository, ProductRepositoryInMemory } from '@product/shared/persistence';
import ProductBuilder from '../../ProductBuilder';

import { UpdateProduct } from '@product/core/useCase';

describe('UpdateProduct', () => {
  let updateProduct: UpdateProduct;
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new ProductRepositoryInMemory();
    updateProduct = new UpdateProduct(productRepository);
  });

  it('should update a product', async () => {
    const productId = 1;
    const product = new ProductBuilder()
      .withName('Product Name')
      .withDescription('Product Description')
      .withValue(28)
      .build();
    await productRepository.createProduct(product);

    const updateProductDto = new ProductBuilder()
      .withName('Updated Product Name')
      .withDescription('Updated Product Description')
      .withValue(89)
      .build();

    const updatedProduct = await updateProduct.execute(
      productId,
      updateProductDto,
    );

    expect(updatedProduct).toBeDefined();
    expect(updatedProduct.name).toBe('Updated Product Name');
    expect(updatedProduct.description).toBe('Updated Product Description');
    expect(updatedProduct.value).toBe(89);
  });

  it('should throw error if product name is too short', async () => {
    const productId = 1;
    const updateProductDto = new ProductBuilder()
      .withName('Test')
      .withDescription('Updated Product Description')
      .withValue(35)
      .build();

    await expect(
      updateProduct.execute(productId, updateProductDto),
    ).rejects.toThrow(/Product Name must have at least 5/);
  });

  it('should throw error if product description is too short', async () => {
    const productId = 1;
    const updateProductDto = new ProductBuilder()
      .withName('Updated Product Name')
      .withDescription('Test')
      .withValue(30)
      .build();

    await expect(
      updateProduct.execute(productId, updateProductDto),
    ).rejects.toThrow(/Product Description must have at least 10/);
  });

  it('should throw error if product value is negative', async () => {
    const productId = 1;
    const updateProductDto = new ProductBuilder()
      .withName('Updated Product Name')
      .withDescription('Updated Product Description')
      .withValue(-20)
      .build();

    await expect(
      updateProduct.execute(productId, updateProductDto),
    ).rejects.toThrow(/Product value must be greater than 0/);
  });
});
