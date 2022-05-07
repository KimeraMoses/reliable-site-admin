import { axios } from 'lib';
import { enableDisableMFAConfig } from './requests';

// MFA Calls
export const enableDisableMFA = async ({ userId, flag }) => {
  const res = await axios.post(enableDisableMFAConfig().url, {
    userId,
    flag,
  });
  return res;
};
