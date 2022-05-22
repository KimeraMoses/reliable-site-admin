import { getConfig } from 'lib';

// User API Keys Management End-Points
// TODO: Change module name after fix from backend-devs
const apiKeyConfig = (action) => getConfig({ module: 'Users', action });
// Get API Keys
export const getAPIKeysConfig = () => ({
  url: `/api/manageuserapikey/search`,
  defaultData: {
    advancedSearch: {
      fields: [''],
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
  },
  config: apiKeyConfig('View'),
});
// Get API Keys By User ID
export const getAPIKeysByUserIDConfig = (uid) => ({
  url: `/api/manageuserapikey/search`,
  defaultData: {
    advancedSearch: {
      fields: ['userIds'],
      keyword: uid,
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
  },
  config: apiKeyConfig('View'),
});
// Add API Key
export const addAPIKeyConfig = () => ({
  url: `/api/manageuserapikey`,
  config: apiKeyConfig('Create'),
});
// Update API Key
export const updateAPIKeyConfig = (id) => ({
  url: `/api/manageuserapikey/${id}`,
  config: apiKeyConfig('Update'),
});
// Delete API Key
export const deleteAPIKeyConfig = (id) => ({
  url: `/api/manageuserapikey/${id}`,
  config: apiKeyConfig('Delete'),
});
