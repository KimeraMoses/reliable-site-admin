import {
  createProductCall,
  deleteProductByIDCall,
  getError,
  getProductsByIDCall,
  getProductsCall,
  updateProductsByIDCall,
} from 'lib';
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
      dispatch(getProductsDispatch(products?.data?.data));
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
      dispatch(getProductDispatch(product?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

// Update Product By ID
export const updateProductByID = (id, data) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const res = await updateProductsByIDCall(id, data);
      if (res?.status === 200) {
        const product = await getProductsByIDCall(id);
        dispatch(getProductDispatch(product?.data?.data));
        toast.success('Product updated successfully');
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

// Create a Product
export const createProduct = (data) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const res = await createProductCall(data);
      if (res?.status === 200) {
        const products = await getProductsCall();
        dispatch(getProductsDispatch(products?.data?.data));
        toast.success('Product created successfully');
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

// Delete Product By ID
export const deleteProductByID = (id) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const res = await deleteProductByIDCall(id);
      if (res?.status === 200) {
        const products = await getProductsCall();
        dispatch(getProductsDispatch(products?.data?.data));
        toast.success('Product deleted successfully');
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};
