const xml2js = require('xml2js');

const { GET_DB } = require('../config/mongodb');
const { ObjectId } = require('mongodb');

const USER_COLLECTION = 'wishlists';
const jsonToXml = (jsonData) => {
  const builder = new xml2js.Builder();
  return builder.buildObject(jsonData);
};
async function getAllWishlist(userId) {
  const result = await GET_DB()
    .collection(USER_COLLECTION)
    .find({ userId: new ObjectId(userId) })
    .toArray();

  // Xử lý dữ liệu thành cấu trúc mong muốn
  const items = result.map((wishlist) => ({
    item: [
      { id: wishlist._id.toString() },
      { name: wishlist.name },
      { image: wishlist.image },
      { price: wishlist.price },
      { stockstt: wishlist.stockstt },
      { quantity: wishlist.quantity },
      { userId: wishlist.userId.toString() },
      { productId: wishlist.productId.toString() },
      { unit: wishlist.unit },
    ],
  }));

  // Bọc toàn bộ dữ liệu trong thẻ <result>
  const xmlData = jsonToXml({ result: items });

  return xmlData;
}
module.exports = {
  getAllWishlist,
};
