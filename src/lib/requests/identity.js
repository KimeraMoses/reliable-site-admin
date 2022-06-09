import { getConfig } from 'lib';

// Identity End-Points
const Identity = 'Identity';
const identityConfig = (action) => getConfig({ module: Identity, action });
export const getProfile = () => ({
  url: `/api/identity/profile`,
  config: identityConfig('View'),
});
export const registerAdminConfig = () => ({
  url: '/api/identity/register-admin',
  config: identityConfig('Create'),
});
export const updateUserProfileConfig = () => ({
  url: `/api/identity/profile`,
  config: identityConfig('Update'),
});
export const updateUserProfileByIDConfig = (id) => ({
  url: `/api/identity/profile/${id}`,
  config: identityConfig('Update'),
});
export const getUserProfileByIDConfig = (id) => ({
  url: `/api/identity/profile/${id}`,
  config: identityConfig('View'),
});
export const changePasswordConfig = () => ({
  url: `/api/identity/change-password`,
  config: identityConfig('Update'),
});
export const updateEmailConfig = () => ({
  url: `/api/identity/updateemail`,
  config: identityConfig('Update'),
});
