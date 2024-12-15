const xml2js = require('xml2js');

const { GET_DB } = require('../config/mongodb');

const USER_COLLECTION = 'categories';
const jsonToXml = (jsonData) => {
  const builder = new xml2js.Builder();
  return builder.buildObject(jsonData);
};
async function getAllCategories() {
  const result = await GET_DB().collection(USER_COLLECTION).find({}).toArray();

  // Xử lý dữ liệu thành cấu trúc mong muốn
  const items = result.map((category) => ({
    item: [
      { id: category._id.toString() },
      { name: category.name },
      { image: category.image },
    ],
  }));

  // Bọc toàn bộ dữ liệu trong thẻ <result>
  const xmlData = jsonToXml({ result: items });

  return xmlData;
}
module.exports = {
  getAllCategories,
};
