const xml2js = require('xml2js');

const { GET_DB } = require('../config/mongodb');

const USER_COLLECTION = 'categories';
const jsonToXml = (jsonData) => {
  const builder = new xml2js.Builder();
  return builder.buildObject(jsonData);
};
async function getAllCategories() {
  const result = await await GET_DB()
    .collection(USER_COLLECTION)
    .find({}, { projection: { _id: 0 } })
    .toArray();
  const xmlData = jsonToXml({ result });
  return xmlData;
}

module.exports = {
  getAllCategories,
};
