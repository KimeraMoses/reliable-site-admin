import { getConfig } from 'lib';

// Users
const Users = 'Users';
export const getUsersConfig = () => ({
  url: `/api/users/getallusersbyrolename/admin`,
  config: getConfig({ module: Users, action: 'View' }),
});
export const getUserConfig = (id) => ({
  url: `/api/users/${id}`,
  config: getConfig({ module: Users, action: 'View' }),
});
export const getClientsConfig = () => ({
  url: `/api/users/getallusersbyrolename/client`,
  config: getConfig({ module: Users, action: 'View' }),
});
export const getSpecificConfig = () => ({
  url: `/api/users/find/specific`,
  config: getConfig({ module: Users, action: 'View' }),
});
