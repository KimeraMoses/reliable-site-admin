import { axios, getError, getPaymentGatewaysConfig } from 'lib';
import { toast } from 'react-toastify';
import { getPaymentGateways, setPaymentGatewaysLoading } from 'store/Slices';

export const getAllPaymentGateways = () => {
  return async (dispatch) => {
    dispatch(setPaymentGatewaysLoading(true));
    try {
      const { url, defaultData, config } = getPaymentGatewaysConfig();
      const response = await axios.post(url, defaultData, config);
      dispatch(getPaymentGateways(response?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setPaymentGatewaysLoading(false));
    }
  };
};
