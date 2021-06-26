import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';


const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
    },
  }),
  productsController.create,
);

productsRouter.get(
  '/',
  productsController.index,
);

productsRouter.put(
  '/:name',
  productsController.update,
);


export { productsRouter };
