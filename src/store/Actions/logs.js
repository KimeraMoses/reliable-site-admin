import { toast } from 'react-toastify';

import {
  getError,
  axios,
  getLogsConfig,
  getUserLoginSessions,
  getLogsByUserIDConfig,
} from 'lib';
import {
  getLogsSlice,
  getUserLogsSlice,
  setLogsLoading,
  getLoginSessionsSlice,
} from 'store/Slices/logs';

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

export const getUserLogs = (uid) => {
  return async (dispatch) => {
    dispatch(setLogsLoading(true));
    if (token) {
      try {
        const { url } = getLogsByUserIDConfig(uid);
        const res = await axios.get(url);
        await dispatch(getUserLogsSlice(res?.data?.data));
        dispatch(setLogsLoading(false));
      } catch (e) {
        toast.error(getError(e));
        dispatch(setLogsLoading(false));
      }
    }
  };
};

export const getLoginSessions = (id) => {
  return async (dispatch) => {
    dispatch(setLogsLoading(true));
    if (token) {
      try {
        const { url } = getUserLoginSessions(id);
        const res = await axios.get(url);
        await dispatch(getLoginSessionsSlice(res?.data?.data));
        dispatch(setLogsLoading(false));
      } catch (e) {
        toast.error(getError(e));
        dispatch(setLogsLoading(false));
      }
    }
  };
};
