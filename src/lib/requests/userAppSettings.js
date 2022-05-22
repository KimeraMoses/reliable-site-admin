import { getConfig } from 'lib';

// UserAppSettings End-Points
// TODO: Fix module name once backend issue is resolved
const userAppSettingsConfig = (action) =>
  getConfig({ module: 'Users', action });
// Get User Settings
export const getUserAppSettingsConfig = (id) => {
  return {
    url: `api/v1/admin/userappsettings/getuserappsettingbyuserid/${id}`,
    config: userAppSettingsConfig('View'),
  };
};
