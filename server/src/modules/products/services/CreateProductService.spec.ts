import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';
import { FakeProductsRepository } from '../repositories/fakes/FakeProductsRepository';
import { CreateProductService } from './CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;

describe('Create Product', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    createProduct = new CreateProductService(
      fakeProductsRepository
    );
  });
  it('should be able to create a new product', async () => {
    const product = await createProduct.execute({
      name: 'john doe',
      description: 'johndoe@gmail.com',
      price: '123456',
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a new product with an existing name', async () => {
    await createProduct.execute({
      name: 'john doe',
      description: 'johndoe@gmail.com',
      price: '123456',
    });

    await expect(
      createProduct.execute({
        name: 'john doe',
        description: 'johndoe@gmail.com',
        price: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
