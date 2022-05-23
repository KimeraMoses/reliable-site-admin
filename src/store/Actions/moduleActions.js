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

export const getUserModules = () => {
  return async (dispatch) => {
    setModuleLoading(true);
    // Get User Profile
    try {
      const { url } = getProfile();
      const userRes = await axios.get(url);
      const userId = userRes?.data?.data?.id;
      // Get User Level Modules if UserID exists
      if (userId) {
        try {
          const { url } = getUserModulesConfig(userId);
          const moduleRes = await axios.get(url);
          dispatch(getUserLevelModules(moduleRes?.data?.data));
          setModuleLoading(false);
        } catch (e) {
          toast.error(getError(e));
          setModuleLoading(false);
        }
      }
    } catch (e) {
      toast.error(getError(e));
      setModuleLoading(false);
    }
  };
};
