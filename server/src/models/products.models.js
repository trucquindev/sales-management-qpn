import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';
import xml2js from 'xml2js';
const PRODUCTS_COLLECTION_NAME = 'products';

const jsonToXml = (jsonData) => {
  const builder = new xml2js.Builder();
  return builder.buildObject(jsonData);
};

const getAllProducts = async () => {
  try {
    const result = await GET_DB()
      .collection(PRODUCTS_COLLECTION_NAME)
      .find({})
      .toArray();

    const items = result.map((product) => ({
      item: [
        { id: product._id.toString() },
        { name: product.name },
        { price: product.price },
        { image: product.image[0] },
        { star: product.star },
      ],
    }));
    const xmlData = jsonToXml({ result: items });

    return xmlData;

  } catch (error) {
    throw new Error(error);
  }
};

const createProducts = async (data) => {
  try {
    const products = await GET_DB()
      .collection(PRODUCTS_COLLECTION_NAME)
      .insertOne({ ...data, userId: new ObjectId(data.userId) });
    return products;
  } catch (error) {
    throw new Error(error);
  }
};
const getPostById = async (postId) => {
  try {
    return await GET_DB()
      .collection(PRODUCTS_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(postId) });
  } catch (error) {
    throw new Error(error);
  }
};
const update = async (postId, updateData) => {
  try {
    // loc cho field tap nham khi update
    // Object.keys(updateData).forEach((fieldName) => {
    //   if (INVALID_UPDATE_FIELDS.includes(fieldName))
    //     delete updateData[fieldName];
    // });
    const result = await GET_DB()
      .collection(PRODUCTS_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(postId) },
        { $set: updateData },
        { returnDocument: 'after' }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const productsModel = {
  getAllProducts,
  createProducts,
  PRODUCTS_COLLECTION_NAME,
  getPostById,
  update,
};
