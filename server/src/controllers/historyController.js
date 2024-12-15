import { StatusCodes } from 'http-status-codes';
import { historyService } from '~/services/historyService';
const getAllHistory = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { page, itemsPerPage } = req.query;

    // điều hướng dữ liệu sang service
    const getAllHistory = await historyService.getAllHistory(
      userId,
      page,
      itemsPerPage
    );

    // trả về kết quả thành công
    res.status(StatusCodes.OK).json(getAllHistory);
  } catch (error) {
    next(error);
  }
};
const getPostById = async (req, res, next) => {
  try {
    const { postId } = req.query;
    // điều hướng dữ liệu sang service
    const getPost = await historyService.getPostById(postId);

    // trả về kết quả thành công
    res.status(StatusCodes.OK).json(getPost);
  } catch (error) {
    next(error);
  }
};
export const historyController = {
  getAllHistory,
  getPostById,
};
