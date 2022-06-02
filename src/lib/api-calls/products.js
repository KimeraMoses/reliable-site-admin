import {
  getProductsConfig,
  getProductsByIDConfig,
  updateProductsByIDConfig,
  axios,
} from 'lib';
import axiosIn from 'axios';

// Get All Products
export const getProductsCall = async () => {
  const res = await axios.post(
    getProductsConfig().url,
    {
      advancedSearch: {
        fields: [''],
        keyword: '',
      },
      keyword: '',
      pageNumber: 0,
      pageSize: 0,
      orderBy: [''],
    },
    getProductsConfig().config
  );
  return res;
};

// Get Products By ID
export const getProductsByIDCall = async (id) => {
  const { url, config } = getProductsByIDConfig(id);
  const res = await axios.get(url, config);
  return res;
};

// Update Product By ID
export const updateProductsByIDCall = async (id, data) => {
  const res = await axiosIn.put(updateProductsByIDConfig(id).url, data);
  return res;
};
