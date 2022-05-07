import { toast } from 'react-toastify';

import { getError, axios, getLogsConfig } from 'lib';
import { getLogsSlice, setLogsLoading } from 'store/Slices/logs';

let token = '';
const AuthToken = localStorage.getItem('AuthToken');
if (AuthToken) {
  token = JSON.parse(AuthToken)?.token;
}

export const getLogs = () => {
  return async (dispatch) => {
    dispatch(setLogsLoading(true));
    if (token) {
      try {
        const { url } = getLogsConfig();
        const res = await axios.get(url);
        await dispatch(getLogsSlice(res?.data?.data));
        dispatch(setLogsLoading(false));
      } catch (e) {
        toast.error(getError(e));
        dispatch(setLogsLoading(false));
      }
    }
  };
};
