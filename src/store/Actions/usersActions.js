import { getError, axios, getUsersConfig, getUserConfig } from 'lib';
import { toast } from 'react-toastify';
import { getUser, getUsersDispatch, setUserLoading } from 'store/Slices';

export const getUsers = () => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      const { url, config } = getUsersConfig();
      const res = await axios.get(url, config);
      dispatch(getUsersDispatch(res?.data?.data));
      dispatch(setUserLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setUserLoading(false));
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      const { url, config } = getUserConfig(id);
      const res = await axios.get(url, config);
      dispatch(getUser(res?.data?.data));
      dispatch(setUserLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setUserLoading(false));
    }
  };
};
