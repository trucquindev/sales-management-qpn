import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { userRouter } from './user.routes';
const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ massage: 'Apis v1 are ready to use' });
});
Router.use('/user', userRouter);

export const APIs_V1 = Router;
