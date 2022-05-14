const getConfig = ({ module, action, xForwardedFor }) => {
  const config = {
    headers: {
      modulename: module,
      moduleactionname: action,
      'X-Forwarded-For': xForwardedFor,
    },
  };
  return config;
};

// ModuleManagement End-Points
const ModuleManagement = 'ModuleManagement';
export const getAppModulesConfig = () => ({
  url: '/api/modulemanagement/getmodulebytenant/admin',
  config: getConfig({ module: ModuleManagement, action: 'View' }),
});

// UserModuleManagement End-Points
const UserModuleManagement = 'UserModuleManagement';
// Get User Modules
export const getUserModulesConfig = (userId) => ({
  url: `/api/usermodulemanagement/getmodulebyuser/${userId}`,
  config: getConfig({ module: UserModuleManagement, action: 'View' }),
});
// Add User Module
export const addUserModule = () => ({
  url: `/api/usermodulemanagement`,
  config: getConfig({ module: UserModuleManagement, action: 'Create' }),
});
// Update User Module (mid = Module ID)
export const updateUserModule = (mid) => ({
  url: `/api/usermodulemanagement/${mid}`,
  config: getConfig({ module: UserModuleManagement, action: 'Update' }),
});

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
export const changePasswordConfig = () => ({
  url: `/api/identity/change-password`,
  config: identityConfig('Update'),
});
export const updateEmailConfig = () => ({
  url: `/api/identity/updateemail`,
  config: identityConfig('Update'),
});

// Users
const Users = 'Users';
export const getUsersConfig = () => ({
  url: `/api/users`,
  config: getConfig({ module: Users, action: 'View' }),
});
export const getUserConfig = (id) => ({
  url: `/api/users/${id}`,
  config: getConfig({ module: Users, action: 'View' }),
});

// Admin Groups
const AdminGroups = 'AdminGroups';
const adminGroupsConfig = (action) =>
  getConfig({ module: AdminGroups, action });
// Get Admin Groups
export const getAdminGroupsConfig = () => ({
  url: '/api/admingroups/search',
  config: adminGroupsConfig('View'),
});
// Create Admin Group
export const createAdminGroup = () => ({
  url: '/api/admingroups',
  config: adminGroupsConfig('Create'),
});
// Get Admin Group By ID
export const getAdminGroupById = (id) => ({
  url: `/api/admingroups/${id}`,
  config: adminGroupsConfig('View'),
});
// Delete Group By ID
export const deleteAdminGroup = (id) => ({
  url: `/api/admingroups/${id}`,
  config: adminGroupsConfig('Delete'),
});
// Update Group By ID
export const updateAdminGroup = (id) => ({
  url: `/api/admingroups/${id}`,
  config: adminGroupsConfig('Update'),
});

// Admin Group Module Management
const AdminGroupModuleManagement = 'AdminGroupModuleManagement';
const adminGMMC = (action) =>
  getConfig({ module: AdminGroupModuleManagement, action });
// Get Admin Group Permissions
export const getAdminGroupPermissions = (groupId) => ({
  url: `/api/admingroupmodulemanagement/getmodulebyadmingroup/${groupId}`,
  config: adminGMMC('View'),
});
// Create Admin Group Permission
export const createAdminGroupPermission = () => ({
  url: `/api/admingroupmodulemanagement`,
  config: adminGMMC('Create'),
});
// Update Admin Group Permission
export const updateAdminGroupPermission = (permissionId) => ({
  url: `/api/admingroupmodulemanagement/${permissionId}`,
  config: adminGMMC('Update'),
});

// MFA Authentication Endpoints
export const validateMFAConfig = () => ({
  url: '/api/mfauthenticator/validate-mfa',
});
export const validateOTPConfig = () => ({
  url: '/api/mfauthenticator/validate-otp-2fa',
});
// Reset Authenticator
export const resetauthenticator = () => ({
  url: '/api/mfauthenticator/reset-authenticator',
});
// Enable-Disable MFA
export const enableDisable2FAConfig = () => ({
  url: '/api/mfauthenticator/enable-disable-2fa',
});
// Check MFA Status
export const getCurrentMFAStatus = () => ({
  url: `/api/mfauthenticator/getcurrentstatusoftwofactorauthentication`,
});
// Send OTP to Email
export const sendOTPToEmailConfig = () => ({
  url: '/api/mfauthenticator/generateotpemail',
});

// Logs and Login History End-Points
export const getLogsConfig = () => ({
  url: '/api/audit-logs',
});
export const getLogsByUserIDConfig = (uid) => ({
  url: `/api/audit-logs/getuserlogs/${uid}`,
});
export const getUserLoginSessions = (userId) => ({
  url: `/api/userloginhistory/loginhistorybyuserid/${userId}`,
});

// UserAppSettings End-Points
const UserAppSettings = 'UserAppSettings';
const userAppSettingsConfig = (action) =>
  getConfig({ module: UserAppSettings, action });
// Get User Settings
export const getUserAppSettingsConfig = (id) => {
  return {
    url: `api/v1/admin/userappsettings/${id}`,
    config: userAppSettingsConfig('View'),
  };
};
