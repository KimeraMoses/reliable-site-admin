import { axios } from 'lib';
import { enableDisable2FAConfig } from './requests';

// MFA Calls
export const enableDisable2FA = async ({ userId, flag }) => {
  const res = await axios.post(enableDisable2FAConfig().url, {
    userId,
    flag,
  });
  return res;
};
// Remove Authentication
export const removeAuthentication = async ({ userId }) => {
  const res = await axios.post('/api/mfauthenticator/resetauthenticator', {
    userId,
  });
  return res;
};
