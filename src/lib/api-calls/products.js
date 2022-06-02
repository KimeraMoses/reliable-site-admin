import { getProductsConfig, getProductsByIDConfig } from 'lib';
import axios from 'axios';

// Get All Products
export const getProductsCall = async () => {
  const res = await axios.get(getProductsConfig().url);
  return res;
};

// Get Products By ID
export const getProductsByIDCall = async (id) => {
  const res = await axios.get(getProductsByIDConfig(id).url);
  return res;
};
