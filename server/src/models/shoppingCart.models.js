import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';

const SHOPPPING_CART_COLLECTION_NAME = 'shopping-cart';
const PRODUCTS_COLLECTION_NAME = 'products';

// Hàm lấy tất cả giỏ hàng
const addCartItem = async (customer_id, product_id, quantity) => {
  const checkCartItem = await GET_DB()
    .collection(SHOPPPING_CART_COLLECTION_NAME)
    .findOne({ customer_id, product_id });
  if (!checkCartItem) {
    const newCartItem = {
      customer_id,
      product_id,
      quantity: quantity || 1,
    };
    await GET_DB()
      .collection(SHOPPPING_CART_COLLECTION_NAME)
      .insertOne(newCartItem);
  } else {
    await GET_DB()
      .collection(SHOPPPING_CART_COLLECTION_NAME)
      .updateOne(
        { customer_id, product_id },
        { $set: { quantity: checkCartItem.quantity + 1 } }
      );
  }
};

// Hàm lấy tất cả giỏ hàng
const getAllCarts = async (userId) => {
  // Lấy kết nối tới MongoDB
  const db = await GET_DB();

  // Lấy giỏ hàng của người dùng
  const shoppingCartItems = await db
    .collection(SHOPPPING_CART_COLLECTION_NAME)
    .find({ customer_id: userId })
    .toArray();

  if (!shoppingCartItems || shoppingCartItems.length === 0) {
    return []; // Trả về mảng rỗng nếu không có sản phẩm trong giỏ hàng
  }

  // Lấy danh sách product_id từ giỏ hàng
  const productIds = shoppingCartItems.map((item) => item.product_id);

  // Lấy thông tin sản phẩm từ bảng products
  const products = await db
    .collection(PRODUCTS_COLLECTION_NAME)
    .find({ _id: { $in: productIds.map((id) => new ObjectId(id)) } }) // Chuyển đổi product_id thành ObjectId
    .project({ name: 1, image: 1, star: 1, price: 1 }) // Chỉ lấy các trường cần thiết
    .toArray();

  // Kết hợp thông tin sản phẩm vào từng mục trong giỏ hàng
  return shoppingCartItems.map((cartItem) => {
    const product = products.find(
      (p) => p._id.toString() === cartItem.product_id
    );
    return {
      item: {
        _id: cartItem._id.toString(),
        customer_id: cartItem.customer_id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
        product: product
          ? {
              name: product.name,
              image: product.image[0], // Lấy hình ảnh đầu tiên
              star: product.star,
              price: product.price,
            }
          : null, // Nếu không tìm thấy product
      },
    };
  });
};

// Hàm xóa sản phẩm khỏi giỏ hàng
const deleteCartItem = async (id) => {
  await GET_DB()
    .collection(SHOPPPING_CART_COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) });
};

export const shoppingCartModel = {
  getAllCarts,
  addCartItem,
  deleteCartItem,
};
