import { ChangeFavoriteStatusService } from '@modules/products/services/ChangeFavoriteStatusService';
import { CreateProductService } from '@modules/products/services/CreateProductService';
import { ListProductService } from '@modules/products/services/ListProductService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute(data);

    return response.json(classToClass(product));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);
    const products = await listProducts.execute();

    return response.json(classToClass(products));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;
    const changeFavoriteStatus = container.resolve(ChangeFavoriteStatusService);
    const updatedProduct = await changeFavoriteStatus.execute(name);

    return response.json(updatedProduct);
  }
}
export { ProductsController };
