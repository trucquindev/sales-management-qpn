import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';

const SHOPPPING_CART_COLLECTION_NAME = 'shopping-cart';

// Hàm lấy tất cả giỏ hàng
const addCartItem = async (customer_id, product_id, quantity) => {
  const newCartItem = { customer_id, product_id, quantity: quantity || 1 };
  await GET_DB()
    .collection(SHOPPPING_CART_COLLECTION_NAME)
    .insertOne(newCartItem);
};

// Hàm lấy tất cả giỏ hàng
const getAllCarts = async () => {
  return await GET_DB()
    .collection(SHOPPPING_CART_COLLECTION_NAME)
    .find()
    .toArray();
};

// Hàm xóa sản phẩm khỏi giỏ hàng
const deleteCartItem = async (id) => {
  await GET_DB()
    .collection(SHOPPPING_CART_COLLECTION_NAME)
    .deleteOne({ _id: ObjectId(id) });
};

export const shoppingCartModel = {
  getAllCarts,
  addCartItem,
  deleteCartItem,
};
