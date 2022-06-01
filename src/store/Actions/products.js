import { getError, getProductsCall } from 'lib';
import { toast } from 'react-toastify';
import { getProductsDispatch, setProductsLoading } from 'store/Slices';

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
