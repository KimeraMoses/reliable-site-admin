import { getProductsConfig } from 'lib';
import axios from 'axios';

// Get All Products
export const getProductsCall = async () => {
  const res = await axios.get(getProductsConfig().url);
  return res;
};
