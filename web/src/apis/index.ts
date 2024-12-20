import authorizedAxiosInstance from '../untils/authorizeAxios';
//updateBoard
export const getAllCategoryAPI = async () => {
  const response = await authorizedAxiosInstance.get('/category');
  return response.data;
};
export const getDetailCategoryAPI = async (id: string | undefined) => {
  const response = await authorizedAxiosInstance.get(`/api/Category/${id}`);
  return response.data;
};
export const getAllProductAPI = async () => {
  const response = await authorizedAxiosInstance.get('/api/Product');
  return response.data;
};
export const getDetailProductAPI = async (productId: string | undefined) => {
  const response = await authorizedAxiosInstance.get(
    `/api/Product/${productId}`
  );
  return response.data;
};
// export const getAllMyWishAPI = async () => {
//   const response = await authorizedAxiosInstance.get('/api/Wishlist');
//   return response.data;
// };
// export const getDetailProductAPI = async (productId: string | undefined) => {
//   const response = await authorizedAxiosInstance.get(
//     `/api/Product/${productId}`
//   );
//   return response.data;
// };
export const getAllWishlistByUserIdAPI = async (userId: string | undefined) => {
  const response = await authorizedAxiosInstance.get(`/wishlist/${userId}`);
  return response.data;
};
interface ProductWishlist {
  name: string;
  price: number;
  stockstt: boolean;
  userId: string;
  image: string;
  quantity: number;
  unit: string;
}
export const postWishlistAPI = async (data: any) => {
  const response = await authorizedAxiosInstance.post(
    `/wishlist/create`,
    data,
    {
      headers: {
        'Content-Type': 'application/xml', // Đặt Content-Type là application/xml
      },
    }
  );
  return response.data;
};
export const deleteWishlistAPI = async (id: any) => {
  const response = await authorizedAxiosInstance.delete('/wishlist/delete', {
    headers: {
      'Content-Type': 'application/xml',
    },
    data: id, // Body của request sẽ nằm trong `data`
  });
  return response.data;
};
export const getAllCustomerAPI = async () => {
  const response = await authorizedAxiosInstance.get(`/api/Customer`);
  return response.data;
};
