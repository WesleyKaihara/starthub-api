import ProductRepository from '@src/module/product/shared/persistence/repository/product.repository';
import InMemoryProductRepository from '@src/module/product/shared/persistence/repository/ProductRepositoryInMemory';
import Product from '@src/module/product/core/entity/Product';

import { GetAllProducts } from '@product/core/useCase';

describe('GetAllProducts', () => {
  let getAllProducts: GetAllProducts;
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    getAllProducts = new GetAllProducts(productRepository);
  });

  it('should get all products', async () => {
    const product1 = Product.create('Product 1', 'Description 1', 20);
    const product2 = Product.create('Product 2', 'Description 2', 50);
    await productRepository.createProduct(product1);
    await productRepository.createProduct(product2);

    const products = await getAllProducts.execute();

    expect(products).toHaveLength(2);
    expect(products[0].name).toBe('Product 1');
    expect(products[0].description).toBe('Description 1');
    expect(products[0].value).toBe(20);

    expect(products[1].name).toBe('Product 2');
    expect(products[1].description).toBe('Description 2');
    expect(products[1].value).toBe(50);
  });
});
