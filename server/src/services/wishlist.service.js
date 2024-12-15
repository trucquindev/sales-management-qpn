const { getAllWishlist, createNew } = require('../models/wishlist.model');
const { default: ApiError } = require('~/utils/ApiError');
const { StatusCodes } = require('http-status-codes');

async function getAllWishlistService(userId) {
  try {
    const result = await getAllWishlist(userId);
    return result;
  } catch (error) {
    throw new ApiError(StatusCodes.OK, 'Categories not found');
  }
}
async function createNewService(data) {
  try {
    const result = await createNew(data);
    return result;
  } catch (error) {
    throw new ApiError(StatusCodes.OK, 'Add wishlist item failed');
  }
}
module.exports = { getAllWishlistService, createNewService };
