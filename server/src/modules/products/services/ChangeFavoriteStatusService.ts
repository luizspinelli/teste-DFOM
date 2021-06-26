import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Product } from '../infra/typeorm/entities/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
class ChangeFavoriteStatusService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  public async execute(name: string): Promise<Product> {
    const product = await this.productsRepository.findByName(name);

    if (!product) {
      throw new AppError('Product not found', 400);
    }

    const newProduct = {
      ...product,
      favorite: !product.favorite
    }

    const updatedProduct = await this.productsRepository.save(newProduct)

    return updatedProduct;
  }
}

export { ChangeFavoriteStatusService };
