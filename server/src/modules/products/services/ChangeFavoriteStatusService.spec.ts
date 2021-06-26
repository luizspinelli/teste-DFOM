import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';
import { FakeProductsRepository } from '../repositories/fakes/FakeProductsRepository';
import { CreateProductService } from './CreateProductService';
import { ChangeFavoriteStatusService } from './ChangeFavoriteStatusService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let changeFavoriteStatus: ChangeFavoriteStatusService;

describe('Change Favorite Status', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    createProduct = new CreateProductService(
      fakeProductsRepository
    );

    changeFavoriteStatus = new ChangeFavoriteStatusService(
      fakeProductsRepository
    );
  });
  it('should be able to favorite a product', async () => {
    const product = await createProduct.execute({
      name: 'mesa',
      description: 'mesa description',
      price: '123',
    });

    const updatedProduct = await changeFavoriteStatus.execute(product.name)

    expect(updatedProduct.favorite).toBe(true);
  });

  it('should not be able to favorite a non existing product', async () => {

    await expect(
      await changeFavoriteStatus.execute('cama'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
