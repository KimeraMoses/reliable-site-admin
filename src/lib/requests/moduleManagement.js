import { getConfig } from 'lib';

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
