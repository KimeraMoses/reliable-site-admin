import { addAPIKeyConfig, axios, getError } from 'lib';
import { toast } from 'react-toastify';
import { getAPIKeys, setAPILoading } from 'store/Slices/apiKeysSlice';

export const addAPIKey = (data) => {
  return async (dispatch) => {
    dispatch(setAPILoading(true));
    try {
      const { url, config } = addAPIKeyConfig;
      const res = await axios.post(url, data, config);
      console.log(res?.data);
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setAPILoading(false));
    }
  };
};
