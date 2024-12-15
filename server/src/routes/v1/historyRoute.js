import express from 'express';
const Router = express.Router();
import { historyController } from '~/controllers/historyController';
Router.route('/:userId').get(historyController.getAllHistory);
Router.route('/:userId/getPost').get(historyController.getPostById);
export const historyRoute = Router;
