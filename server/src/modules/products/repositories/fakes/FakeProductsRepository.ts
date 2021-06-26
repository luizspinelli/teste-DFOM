import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { Product } from '@modules/products/infra/typeorm/entities/Product';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';
import { IProductsRepository } from '../IProductsRepository';


class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid() }, productData);

    this.products.push(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findIndexProduct => findIndexProduct.id === product.id,
    );

    this.products.splice(findIndex, 1, product);

    return product;
  }

  public async findByID(id: string): Promise<Product | undefined> {
    const product = this.products.find(
      product => product.id === product.id,
    );

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find(
      product => product.name === product.name,
    );

    return product;
  }

  public async findAllProducts(): Promise<Product[]> {
    return this.products;
  }

}

export { FakeProductsRepository };
