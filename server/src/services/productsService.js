import { StatusCodes } from 'http-status-codes';
import { productsModel } from '~/models/products.models';
import ApiError from '~/utils/ApiError';

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();
  if (!result) throw new ApiError(StatusCodes.NOT_FOUND, 'not found');
  return result;
};
const getPostById = async (postId) => {
  // neu khong ton tai gia tri page hoac itemPerPage thi phai luon dat gia tri mac dinh
  const result = await productsModel.getPostById(postId);
  if (!result) throw new ApiError(StatusCodes.NOT_FOUND, 'not found');
  return result;
};
export const productsService = {
  getAllProducts,
  getPostById,
};
