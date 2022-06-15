import { axios } from 'lib';
import { validateDataConfig } from 'lib/requests/whmcs';
import {
  getValidateData,
  setWHMCSError,
  setWHMCSLoading,
  setWHMCSFileType,
} from 'store/Slices';

export const validateWHMCSData = ({ data }) => {
  return async (dispatch) => {
    dispatch(setWHMCSLoading(true));
    try {
      const { url, config } = validateDataConfig();
      dispatch(setWHMCSFileType(data?.whmcsFileType));
      // dispatch()
      const response = await axios.post(url, data, config);
      dispatch(getValidateData(response?.data?.data?.content));
      if (response?.data?.data?.rowValidationErrors?.length) {
        dispatch(setWHMCSError(response?.data?.data?.rowValidationErrors));
      }
    } catch (error) {
      setWHMCSError(error);
    } finally {
      dispatch(setWHMCSLoading(false));
    }
  };
};
