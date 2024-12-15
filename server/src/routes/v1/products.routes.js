import express from 'express';
const Router = express.Router();
import { productsController } from '~/controllers/products.controller';

Router.get('/', productsController.getAllProducts);

export const productsRoute = Router;
