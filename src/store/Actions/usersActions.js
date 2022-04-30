import { getError, axios, getUsersConfig } from 'lib';
import { toast } from 'react-toastify';
import { getUsersDispatch, setUserLoading } from 'store/Slices';

let token = '';
const AuthToken = localStorage.getItem('AuthToken');
if (AuthToken) {
  token = JSON.parse(AuthToken)?.token;
}

export const getUsers = () => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    if (token) {
      try {
        const { url, config } = getUsersConfig();
        const res = await axios.get(url, config);
        dispatch(getUsersDispatch(res?.data?.data));
        dispatch(setUserLoading(false));
      } catch (e) {
        toast.error(getError(e));
        dispatch(setUserLoading(false));
      }
    }
  };
};
