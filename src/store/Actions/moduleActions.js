import {
  getError,
  axios,
  getAppModulesConfig,
  getUserModulesConfig,
  getProfile,
} from 'lib';
import { toast } from 'react-toastify';
import {
  getAppLevelModules,
  getUserLevelModules,
  setModuleLoading,
} from 'store/Slices/moduleSlice';

let token = '';
const AuthToken = localStorage.getItem('AuthToken');
if (AuthToken) {
  token = JSON.parse(AuthToken)?.token;
}

export const getAppModules = () => {
  return async (dispatch) => {
    setModuleLoading(true);
    if (token) {
      try {
        const { url } = getAppModulesConfig();
        const res = await axios.get(url);
        dispatch(getAppLevelModules(res?.data?.data));
        setModuleLoading(false);
      } catch (e) {
        toast.error(getError(e));
        setModuleLoading(false);
      }
    }
  };
};

export const getUserModules = ({ id }) => {
  return async (dispatch) => {
    setModuleLoading(true);
    try {
      const { url } = getUserModulesConfig(id);
      const res = await axios.get(url);
      dispatch(getUserLevelModules(res?.data?.data));
      setModuleLoading(false);
    } catch (e) {
      toast.error(getError(e));
      setModuleLoading(false);
    }
  };
};
