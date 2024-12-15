import express from 'express';
const Router = express.Router();
import { shoppingCartController } from '~/controllers/shoppingCart.controller';

// GET tất cả giỏ hàng
Router.get('/', shoppingCartController.getAllShoppingCarts);

// POST thêm sản phẩm vào giỏ hàng
Router.post('/', shoppingCartController.addShoppingCartItem);

// DELETE xóa sản phẩm khỏi giỏ hàng
Router.delete('/:id', shoppingCartController.deleteShoppingCartItem);

export const shoppingCartRoute = Router;
