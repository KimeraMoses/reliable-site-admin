import { getConfig } from 'lib';

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
