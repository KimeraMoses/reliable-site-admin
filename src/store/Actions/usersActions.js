import {
  getError,
  axios,
  getUsersConfig,
  getUserConfig,
  updateUserModule,
  addUserModule,
  getUserModulesConfig,
  updateUserProfileByIDConfig,
} from 'lib';
import { toast } from 'react-toastify';
import {
  getUser,
  getUserModule,
  getUsersDispatch,
  setUserLoading,
} from 'store/Slices';

// Get All Users
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

// Get User By ID
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

// Update User
export const updateUser = (id, data) => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      const { url, config } = updateUserProfileByIDConfig(id);
      const res = await axios.put(url, data, config);
      if (res.status === 200) {
        const { url, config } = getUserConfig(id);
        const res = await axios.get(url, config);
        dispatch(getUser(res?.data?.data));
        toast.success('User Updated Successfully');
        dispatch(setUserLoading(false));
      }
    } catch (e) {
      toast.error(getError(e));
      dispatch(setUserLoading(false));
    }
  };
};

// Get User Modules By ID
export const getUserModulesById = (id) => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      const { url, config } = getUserModulesConfig(id);
      const res = await axios.get(url, config);
      dispatch(getUserModule(res?.data?.data));
      dispatch(setUserLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setUserLoading(false));
    }
  };
};

// Edit Permissions of a group (gid = GroupID)
export const editUserPermissions = ({ permission, uid }) => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      if (permission?.id) {
        const { url, config } = updateUserModule(permission?.id);
        const updateObj = {
          name: permission?.name,
          permissionDetail: JSON.stringify(permission?.permissionDetail),
          tenant: 'Admin',
          isActive: true,
          adminGroupId: permission?.adminGroupId,
        };
        await axios.put(url, updateObj, config);
      } else {
        const { url, config } = addUserModule();
        const createObj = {
          name: permission?.name,
          permissionDetail: JSON.stringify(permission?.permissionDetail),
          tenant: 'Admin',
          isActive: true,
          userId: uid,
        };
        await axios.post(url, createObj, config);
      }
      dispatch(setUserLoading(false));
    } catch (e) {
      console.log(e);
      toast.error(getError(e));
      dispatch(setUserLoading(false));
    }
  };
};
