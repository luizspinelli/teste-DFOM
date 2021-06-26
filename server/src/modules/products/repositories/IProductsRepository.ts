import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { Product } from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  findByID(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  findAllProducts(): Promise<Product[]>;
}

export { IProductsRepository }
