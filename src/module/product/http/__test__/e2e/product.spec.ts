import * as request from 'supertest';

import { AppModule } from '@src/app.module';
import { TestingModule, Test } from '@nestjs/testing';
import ProductService from '@product/shared/service/product.service';
import {
  ProductRepositoryInMemory,
  ProductRepositorySequelize,
} from '@product/shared/persistence';
import Product from '@product/core/entity/Product';

describe('ProductController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ProductRepositorySequelize)
      .useClass(ProductRepositoryInMemory)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/product (GET)', () => {
    return request(app.getHttpServer())
      .get('/product')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it('should return 500 error when an error occurs while listing products', () => {
    jest
      .spyOn(app.get(ProductService), 'getProducts')
      .mockRejectedValueOnce(new Error('Failed to fetch products'));

    return request(app.getHttpServer())
      .get('/product')
      .expect(500)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty(
          'message',
          'Failed to fetch products',
        );
      });
  });

  it('/product/:productId (GET)', () => {
    const product = Product.restore(1, 'Product 1', 'Description 1', 25);

    jest
      .spyOn(app.get(ProductService), 'findProductById')
      .mockResolvedValueOnce(product);

    return request(app.getHttpServer())
      .get('/product/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('value');
      });
  });

  it('should return 400 error when product is not found', () => {
    return request(app.getHttpServer())
      .get('/product/7')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });

  it('should return 400 error when product id is not a number', () => {
    return request(app.getHttpServer())
      .get('/product/abc')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });

  it('/product (POST)', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        value: 25,
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.name).toBe('Test Product');
        expect(response.body.description).toBe('Test Description');
        expect(response.body.value).toBe(25);
      });
  });

  it('should return error when creating product with invalid name length', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({ name: 'Test', description: 'Valid Description', value: 25 })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
          'Product Name must have at least 5 characters',
        );
      });
  });

  it('should return error when creating product with invalid description length', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({ name: 'Valid Name', description: 'Test', value: 25 })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
          'Product Description must have at least 10 characters',
        );
      });
  });

  it('/product/:productId (PUT)', () => {
    return request(app.getHttpServer())
      .put('/product/1')
      .send({
        name: 'Updated Product',
        description: 'Updated Description',
        value: 25,
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Updated Product');
        expect(response.body.description).toBe('Updated Description');
        expect(response.body.value).toBe(25);
      });
  });

  it('should return error when updating product with invalid name length', () => {
    return request(app.getHttpServer())
      .put('/product/1')
      .send({
        name: 'test',
        description: 'Valid Description',
        value: 25,
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'Product Name must have at least 5 characters',
        );
      });
  });

  it('should return error when updating product with invalid value', () => {
    return request(app.getHttpServer())
      .put('/product/1')
      .send({
        name: 'Product Name',
        description: 'Valid Description',
        value: -5,
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'Product value must be greater than 0',
        );
      });
  });

  it('should return error when updating product with invalid description length', () => {
    return request(app.getHttpServer())
      .put('/product/1')
      .send({ name: 'Valid Name', description: 'Test', value: 35 })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'Product Description must have at least 10 characters',
        );
      });
  });
});
