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

export const postShoppingCard = async (xmlData: string) => {
  try {
    // Gửi dữ liệu dưới dạng XML qua request POST
    const response = await authorizedAxiosInstance.post(
      '/shopping-cart',
      xmlData,
      {
        headers: {
          'Content-Type': 'application/xml', // Xác định kiểu nội dung là XML
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getShoppingCardCustomer = async (customerId: string) => {
  const response = await authorizedAxiosInstance.get(
    `/shopping-cart/${customerId}`,
    { headers: { Accept: 'application/xml' }, responseType: 'text' }
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
