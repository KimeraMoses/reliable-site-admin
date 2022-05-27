import {
  axios,
  getBillingSettingsByTenantConfig,
  getError,
  getMaintenanceSettingsConfig,
  getSettingsByTenant,
  postMaintenanceSettingsConfig,
  updateBillingSettingsConfig,
  updateSettingsConfig,
} from 'lib';
import { toast } from 'react-toastify';
import {
  getAppSettings,
  getBillingSettings,
  getMaintenanceSettings,
  setAppSettingsLoading,
} from 'store/Slices';

// Get Settings By Tenant
export const getAppSettingsByTenant = () => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      const { url, config } = getSettingsByTenant();
      const response = await axios.get(url, config);
      dispatch(getAppSettings(response.data.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};

// Update Settings
export const updateAppSettings = ({ id, data }) => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      const { url, config } = updateSettingsConfig(id);
      const response = await axios.put(url, data, config);
      if (response.status === 200) {
        const { url, config } = getSettingsByTenant();
        const response = await axios.get(url, config);
        dispatch(getAppSettings(response.data.data));
        toast.success('Settings updated successfully');
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};

// Get Billing Settings
export const getBillingSettingsByTenant = () => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      const { url, config } = getBillingSettingsByTenantConfig();
      const response = await axios.get(url, config);
      dispatch(getBillingSettings(response.data.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};

// Update Billing Settings
export const updateBillingSettings = ({ id, data }) => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      const { url, config } = updateBillingSettingsConfig(id);
      const response = await axios.put(url, data, config);
      if (response.status === 200) {
        const { url, config } = getBillingSettingsByTenantConfig();
        const response = await axios.get(url, config);
        dispatch(getBillingSettings(response.data.data));
        toast.success('Settings updated successfully');
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};

// Get Maintenance Settings
export const getMaintenanceSettingsByTenant = () => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      const { url, config } = getMaintenanceSettingsConfig();
      const response = await axios.get(url, config);
      dispatch(getMaintenanceSettings(response?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};

// // Update Maintenance Settings
export const updateMaintenanceSettings = ({ data }) => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      const { url, config } = postMaintenanceSettingsConfig();
      const response = await axios.post(url, data, config);
      if (response.status === 200) {
        const { url, config } = getMaintenanceSettingsConfig();
        const response = await axios.get(url, config);
        dispatch(getMaintenanceSettings(response?.data));
        toast.success('Settings updated successfully');
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};
