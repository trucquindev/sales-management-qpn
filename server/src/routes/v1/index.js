import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { historyRoute } from './historyRoute';
import { expenditureRoute } from './expenditureRoute';
import { userRouter } from './user.routes';
import { cloudinaryRoute } from './cloudinaryRoute';
const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ massage: 'Apis v1 are ready to use' });
});
Router.use('/history', historyRoute);
Router.use('/expenditure', expenditureRoute);
Router.use('/user', userRouter);
Router.use('/cloudinary', cloudinaryRoute);

export const APIs_V1 = Router;
