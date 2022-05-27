import {
  addAPIKeyConfig,
  axios,
  getAPIKeyByIDConfig,
  getAPIKeysByUserIDConfig,
  getAPIKeysConfig,
  getError,
  updateAPIKeyConfig,
  updateAPIKeyPermissionsConfig,
  updateAPIKeySettingsConfig,
} from 'lib';
import { toast } from 'react-toastify';
import { getAPIKeys, getAPIKey, setAPILoading } from 'store/Slices';

// Add a new API Key For a User
export const addAPIKey = (uid, data) => {
  return async (dispatch) => {
    dispatch(setAPILoading(true));
    try {
      const { url, config } = addAPIKeyConfig();
      const res = await axios.post(url, data, config);
      if (res.status === 200) {
        const { url, defaultData, config } = getAPIKeysByUserIDConfig(uid);
        const res = await axios.post(url, defaultData, config);
        dispatch(getAPIKeys(res?.data?.data));
        toast.success('API Key Added Successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setAPILoading(false));
    }
  };
};

// Get ALL API Keys
export const getAllAPIKeys = () => {
  return async (dispatch) => {
    dispatch(setAPILoading(true));
    try {
      const { url, defaultData, config } = getAPIKeysConfig();
      const res = await axios.post(url, defaultData, config);
      dispatch(getAPIKeys(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setAPILoading(false));
    }
  };
};

// Get API Keys by UID
export const getAPIKeysByUID = (uid) => {
  return async (dispatch) => {
    dispatch(setAPILoading(true));
    try {
      const { url, defaultData, config } = getAPIKeysByUserIDConfig(uid);
      const res = await axios.post(url, defaultData, config);
      dispatch(getAPIKeys(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setAPILoading(false));
    }
  };
};

// Get API Key by ID
export const getAPIKeyByID = (id) => {
  return async (dispatch) => {
    dispatch(setAPILoading(true));
    try {
      const { url, config } = getAPIKeyByIDConfig(id);
      const res = await axios.get(url, config);
      dispatch(getAPIKey(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setAPILoading(false));
    }
  };
};

// Update API Key
export const updateAPIKey = (id, data) => {
  return async (dispatch) => {
    dispatch(setAPILoading(true));
    try {
      const { url, config } = updateAPIKeyConfig(id);
      const res = await axios.put(url, data, config);
      if (res.status === 200) {
        toast.success('API Key Updated Successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setAPILoading(false));
    }
  };
};

// Update API Key
export const updateAPIKeySettings = (id, data) => {
  return async (dispatch) => {
    dispatch(setAPILoading(true));
    try {
      const { url, config } = updateAPIKeySettingsConfig(id);
      const res = await axios.put(url, data, config);
      if (res.status === 200) {
        toast.success('API Key Settings Updated Successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setAPILoading(false));
    }
  };
};

// Update API Key Permissions
export const updateAPIKeyPermissions = (id, data) => {
  return async (dispatch) => {
    dispatch(setAPILoading(true));
    try {
      const { url, config } = updateAPIKeyPermissionsConfig(id);
      const res = await axios.put(url, data, config);
      if (res.status === 200) {
        toast.success('API Key Permissions Updated Successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setAPILoading(false));
    }
  };
};
