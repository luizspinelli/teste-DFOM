import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Product } from '../infra/typeorm/entities/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';



interface Request {
  name: string;
  description: string;
  price: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  public async execute({ name, description, price }: Request): Promise<Product> {
    const checkProductExists = await this.productsRepository.findByName(name);

    if (checkProductExists) {
      throw new AppError('product already exists');
    }

    const product = await this.productsRepository.create({
      name,
      description,
      price: Number(price),
      favorite: false
    });

    return product;
  }
}

export { CreateProductService };
