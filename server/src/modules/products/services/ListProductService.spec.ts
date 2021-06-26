import 'reflect-metadata';
import { FakeProductsRepository } from '../repositories/fakes/FakeProductsRepository';
import { CreateProductService } from './CreateProductService';
import { ListProductService } from './ListProductService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let listProducts: ListProductService;

describe('List Products', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    createProduct = new CreateProductService(
      fakeProductsRepository
    );

    listProducts = new ListProductService(
      fakeProductsRepository
    );
  });

  it('should be able to list all products', async () => {
    await createProduct.execute({
      name: 'john doe3',
      description: 'johndoe@gmail.com',
      price: '123456',
    });

    const products = await listProducts.execute()

    expect(products).toHaveLength(1);
  });

});
