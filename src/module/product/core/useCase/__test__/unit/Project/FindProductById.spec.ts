import ProductRepository from '@src/module/product/shared/persistence/repository/product.repository';
import InMemoryProductRepository from '@src/module/product/shared/persistence/repository/ProductRepositoryInMemory';
import ProductBuilder from '../../ProductBuilder';

import { FindProductById } from '@product/core/useCase';

describe('FindProductById', () => {
  let findProductById: FindProductById;
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    findProductById = new FindProductById(productRepository);
  });

  it('should find product by id', async () => {
    const productId = 1;
    const expectedProduct = new ProductBuilder()
      .withName('Product 1')
      .withDescription('Description 1')
      .withValue(25)
      .build();
    await productRepository.createProduct(expectedProduct);

    const product = await findProductById.execute(productId);

    expect(product).toEqual(expectedProduct);
  });

  it('should return null if product is not found', async () => {
    const productId = 2;
    const product = await findProductById.execute(productId);

    expect(product).toBeNull();
  });
});
