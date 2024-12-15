import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { userRouter } from './user.routes';
import { cloudinaryRoute } from './cloudinaryRoute';
import { categoryRoute } from './categories.routes';
import { productsRoute } from './products.routes';
const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ massage: 'Apis v1 are ready to use' });
});
Router.use('/category', categoryRoute);
Router.use('/user', userRouter);
Router.use('/cloudinary', cloudinaryRoute);
Router.use('/products', productsRoute);

export const APIs_V1 = Router;
