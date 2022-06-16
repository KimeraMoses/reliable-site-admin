import { axios } from 'lib';
import { validateDataConfig } from 'lib/requests/whmcs';
import {
  getValidateData,
  setWHMCSError,
  setWHMCSLoading,
  setWHMCSFileType,
  getSelectedData,
} from 'store/Slices';

export const clearWHMCSState = () => {
  return async (dispatch) => {
    dispatch(setWHMCSError(false));
    dispatch(setWHMCSLoading(false));
    dispatch(getValidateData([]));
    dispatch(setWHMCSFileType(0));
  };
};

export const validateWHMCSData = ({ data }) => {
  return async (dispatch) => {
    dispatch(setWHMCSLoading(true));
    try {
      const { url, config } = validateDataConfig();
      dispatch(setWHMCSFileType(data?.whmcsFileType));
      const response = await axios.post(url, data, config);
      if (response?.data?.content) {
        dispatch(getValidateData(JSON.parse(response?.data?.content)));
        dispatch(setWHMCSError(false));
      }
      if (response?.data?.rowValidationErrors?.length) {
        dispatch(setWHMCSError(response?.data?.rowValidationErrors));
      } else {
        dispatch(setWHMCSError(false));
      }
      return response;
    } catch (error) {
      dispatch(setWHMCSError(error));
    } finally {
      dispatch(setWHMCSLoading(false));
    }
  };
};

export const selectData = ({ data }) => {
  console.log(data);
  return async (dispatch) => {
    dispatch(setWHMCSLoading(true));
    try {
      dispatch(getSelectedData(data));
    } catch (error) {
      dispatch(setWHMCSError(error));
    } finally {
      dispatch(setWHMCSLoading(false));
    }
  };
};
