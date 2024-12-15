import { StatusCodes } from 'http-status-codes';
import { productsService } from '~/services/productsService';


const getAllProducts = async (req, res, next) => {
  try {
    const data = await productsService.getAllProducts();

    res.set('Content-Type', 'application/xml');
    res
      .status(200)
      .json({ message: 'Get data products thành công.', data });
  } catch (error) {
    next(error);
  }
};
const getPostById = async (req, res, next) => {
  try {
    const { postId } = req.query;
    // điều hướng dữ liệu sang service
    const getPost = await productsService.getPostById(postId);

    // trả về kết quả thành công
    res.status(StatusCodes.OK).json(getPost);
  } catch (error) {
    next(error);
  }
};
export const productsController = {
  getAllProducts,
  getPostById,
};
