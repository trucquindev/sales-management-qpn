import express from 'express';
const Router = express.Router();
import { expenditureController } from '~/controllers/expenditureController';

Router.use('/', expenditureController);

export const expenditureRoute = Router;
