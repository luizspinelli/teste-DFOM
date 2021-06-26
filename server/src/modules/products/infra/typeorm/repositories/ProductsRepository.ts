import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { Product } from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: MongoRepository<Product>;

  constructor() {
    this.ormRepository = getMongoRepository(Product);
  }

  public async create({ name, description, price }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({ name, description, price });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async findByID(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ where: { id: id } });

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({where: {name: name} });

    return product;
  }

  public async findAllProducts(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }
}

export { ProductsRepository };
