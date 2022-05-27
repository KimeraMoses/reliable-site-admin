import {
  axios,
  getError,
  getSettingsByTenant,
  updateSettingsConfig,
} from 'lib';
import { toast } from 'react-toastify';
import { getAppSettings, setAppSettingsLoading } from 'store/Slices';

// Get Settings By Tenant
export const getAppSettingsByTenant = () => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      const { url, config } = getSettingsByTenant();
      const response = await axios.get(url, config);
      dispatch(getAppSettings(response.data.data));
    } catch (error) {
      dispatch(getError(error));
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
