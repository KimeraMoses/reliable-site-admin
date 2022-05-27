import { axios, getAllEmailTemplatesConfig, getError } from 'lib';
import { toast } from 'react-toastify';
import {
  getEmailTemplate,
  getEmailTemplates,
  setEmailTemplatesLoading,
} from 'store/Slices';

export const getAllEmailTemplates = () => {
  return async (dispatch) => {
    dispatch(setEmailTemplatesLoading(true));
    try {
      const { url, defaultData, config } = getAllEmailTemplatesConfig();
      const res = await axios.post(url, defaultData, config);
      dispatch(getEmailTemplates(res?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setEmailTemplatesLoading(false));
    }
  };
};
