const getConfig = ({ module, action }) => {
  const config = {
    headers: {
      modulename: module,
      moduleactionname: action,
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
export const getUserModulesConfig = (userId) => ({
  url: `/api/usermodulemanagement/getmodulebyuser/${userId}`,
  config: getConfig({ module: UserModuleManagement, action: 'View' }),
});
// Identity End-Points
const Identity = 'Identity';
export const getProfile = () => ({
  url: `/api/identity/profile`,
  config: getConfig({ module: Identity, action: 'View' }),
});
