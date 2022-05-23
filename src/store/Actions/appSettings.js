import { axios, getError, getSettingsByTenant } from 'lib';
import { getAppSettings, setAppSettingsLoading } from 'store/Slices';

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
