import { getError, getProductsByIDCall, getProductsCall } from 'lib';
import { toast } from 'react-toastify';
import {
  getProductsDispatch,
  getProductDispatch,
  setProductsLoading,
} from 'store/Slices';

// Get All Products
export const getProducts = () => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const products = await getProductsCall();
      dispatch(getProductsDispatch(products?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

// Get Product By ID
export const getProductByID = (id) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const product = await getProductsByIDCall(id);
      dispatch(getProductDispatch(product?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};
