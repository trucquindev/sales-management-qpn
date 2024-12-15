import { shoppingCartModel } from '../models/shoppingCart.models';

const getAllShoppingCarts = async () => {
  try {
    return await shoppingCartModel.getAllCarts();
  } catch (err) {
    throw new Error('Error fetching shopping carts');
  }
};

const createShoppingCart = async (customer_id, product_id, quantity) => {
  try {
    await shoppingCartModel.addCartItem(customer_id, product_id, quantity);
  } catch (err) {
    throw new Error('Error adding product to cart');
  }
};

const removeShoppingCartItem = async (id) => {
  try {
    await shoppingCartModel.deleteCartItem(id);
  } catch (err) {
    throw new Error('Error removing product from cart');
  }
};

export const shoppingCartService = {
  getAllShoppingCarts,
  createShoppingCart,
  removeShoppingCartItem,
};
