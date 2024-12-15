import authorizedAxiosInstance from '../../untils/authorizeAxios';
//updateBoard
export const getAllProductAPI = async () => {
  const response = await authorizedAxiosInstance.get('/products');
  return response.data;
};

export const getAllCategoryAPI = async () => {
  const response = await authorizedAxiosInstance.get('/category');
  return response.data;
};

export const postShoppingCard = async (
  customerId: string,
  productId: string
) => {
  const response = await authorizedAxiosInstance.post('/api/ShoppingCard', {
    customerId,
    productId,
  });
  return response.data;
};
export const getShoppingCardCustomer = async (customerId: string) => {
  const response = await authorizedAxiosInstance.get(
    `/api/ShoppingCard/customer/${customerId}`
  );
  return response.data;
};

export const deleteShoppingCard = async (id: string) => {
  await authorizedAxiosInstance.delete(`/api/ShoppingCard/${id}`);
};
export const updateShoppingCard = async (
  id: string,
  quantity: number,
  productID: string,
  customerId: string
) => {
  await authorizedAxiosInstance.put('/api/ShoppingCard', {
    id,
    quantity,
    productID,
    customerId,
  });
};
