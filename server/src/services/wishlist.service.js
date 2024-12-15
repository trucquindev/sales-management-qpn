const { getAllWishlist } = require('../models/wishlist.model');
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

module.exports = { getAllWishlistService };
