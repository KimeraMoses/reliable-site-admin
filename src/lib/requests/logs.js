import { getConfig } from './getConfig';

// Logs and Login History End-Points
export const getLogsConfig = () => ({
  url: '/api/v1/admin/auditlogs',
  config: getConfig({ module: 'Users', action: 'View' }),
});
export const getLogsByUserIDConfig = (uid) => ({
  url: `/api/v1/admin/auditlogs/user/${uid}`,
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
  config: getConfig({ module: 'Users', action: 'View' }),
});
export const getUserLoginSessions = (userId) => ({
  url: `/api/userloginhistory/loginhistorybyuserid/${userId}`,
});
