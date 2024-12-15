const { getAllCategories } = require('../models/categories.models');
const { default: ApiError } = require('~/utils/ApiError');
const { StatusCodes } = require('http-status-codes');

async function getAllCategoryService() {
  try {
    const result = await getAllCategories();
    return result;
  } catch (error) {
    throw new ApiError(StatusCodes.OK, 'Categories not found');
  }
}

module.exports = { getAllCategoryService };
