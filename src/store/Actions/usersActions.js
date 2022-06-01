import {
  getError,
  axios,
  getUsersConfig,
  getUserConfig,
  updateUserModule,
  addUserModule,
  getUserModulesConfig,
  updateUserProfileByIDConfig,
  registerAdminConfig,
  getUserAppSettingsConfig,
  updateUserAppSettings,
  addUserAppSettings,
} from 'lib';
import { toast } from 'react-toastify';
import {
  getUser,
  getUserModule,
  getUsersDispatch,
  setUserLoading,
} from 'store/Slices';
import { getUserSettingsSlice } from 'store/Slices/usersSlice';

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

// Add Admin User
export const addUser = (data) => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      const { url, config } = registerAdminConfig();
      const res = await axios.post(url, data, config);
      if (res.status === 200) {
        const { url, config } = getUsersConfig();
        const res = await axios.get(url, config);
        dispatch(getUsers(res?.data?.data));
        toast.success('User Added Successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setUserLoading(false));
    }
  };
};

// Add Client User
export const addClientUser = (data) => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      const { url, config } = addClientUser();
      const res = await axios.post(url, data, config);
      if (res.status === 200) {
        const { url, config } = getUsersConfig();
        const res = await axios.get(url, config);
        dispatch(getUsers(res?.data?.data));
        toast.success('Client User Added Successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
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
      // If Updated Then Get User
      if (res.status === 200) {
        const { url, config } = getUserConfig(id);
        const res = await axios.get(url, config);
        dispatch(getUser(res?.data?.data));
        // If Get User Done Then Get All Users
        if (res.status === 200) {
          const { url, config } = getUsersConfig();
          const res = await axios.get(url, config);
          dispatch(getUsers(res?.data?.data));
        }
        toast.success('User Updated Successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
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

// Get User Settings By ID
export const getUserSettingsById = (id) => {
  return async (dispatch) => {
    try {
      const { url, config } = getUserAppSettingsConfig(id);
      const res = await axios.get(url, config);
      dispatch(getUserSettingsSlice(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    }
  };
};

// Update User Settings By ID
export const updateUserSettings = ({ data }) => {
  return async (dispatch) => {
    try {
      let res;
      if (data?.id) {
        const { url, config } = updateUserAppSettings({ id: data?.id });
        res = await axios.put(url, data, config);
      } else {
        const { url, config } = addUserAppSettings();
        res = await axios.post(url, data, config);
      }
      if (res.status === 200) {
        const { url, config } = getUserAppSettingsConfig(data?.userId);
        const res = await axios.get(url, config);
        dispatch(getUserSettingsSlice(res?.data?.data));
        toast.success('User Settings Updated Successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    }
  };
};
