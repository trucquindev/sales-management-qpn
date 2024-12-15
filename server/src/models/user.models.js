const { ObjectId } = require('mongodb');
const { GET_DB } = require('../config/mongodb');

const USER_COLLECTION = 'users';

async function createUser(data) {
  const db = GET_DB();
  return await db.collection(USER_COLLECTION).insertOne(data);
}

async function findUserByUsername(username) {
  const db = GET_DB();
  return await db.collection(USER_COLLECTION).findOne({ username });
}
const findOneById = async (userId) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION)
      .findOne({ _id: new ObjectId(userId) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const updateUserModel = async (userId, updateData) => {
  try {
    // loc cho field tap nham khi update
    // Object.keys(updateData).forEach((fieldName) => {
    //   if (INVALID_UPDATE_FIELDS.includes(fieldName))
    //     delete updateData[fieldName];
    // });
    const result = await GET_DB()
      .collection('users')
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: updateData },
        { returnDocument: 'after' }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  createUser,
  findUserByUsername,
  findOneById,
  updateUserModel,
};
