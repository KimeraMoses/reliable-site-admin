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
