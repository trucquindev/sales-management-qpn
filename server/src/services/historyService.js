import { StatusCodes } from 'http-status-codes';
import { expenditureModel } from '~/models/expenditureModel';
import { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants';
import ApiError from '~/utils/ApiError';
const getAllHistory = async (userId, page, itemsPerPage) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // neu khong ton tai gia tri page hoac itemPerPage thi phai luon dat gia tri mac dinh
    if (!page) page = DEFAULT_PAGE;
    if (!itemsPerPage) itemsPerPage = DEFAULT_ITEMS_PER_PAGE;
    const result = await expenditureModel.getAllHistories(
      userId,
      parseInt(page, 10),
      parseInt(itemsPerPage, 10)
    );
    if (!result) throw new ApiError(StatusCodes.NOT_FOUND, 'not found');
    return result;
  } catch (error) {
    throw error;
  }
};
const getPostById = async (postId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // neu khong ton tai gia tri page hoac itemPerPage thi phai luon dat gia tri mac dinh
    const result = await expenditureModel.getPostById(postId);
    if (!result) throw new ApiError(StatusCodes.NOT_FOUND, 'not found');
    return result;
  } catch (error) {
    throw error;
  }
};
export const historyService = {
  getAllHistory,
  getPostById,
};
