import {
  getError,
  axios,
  updateUserProfileConfig,
  getProfile,
  changePasswordConfig,
  updateEmailConfig,
  getIPData,
  getDeviceName,
} from 'lib';
import { toast } from 'react-toastify';
import {
  authenticationFail,
  authenticationPending,
  authenticationSuccess,
  autoAuthenticationSuccess,
  confirmOtpFail,
  confirmOtpPending,
  confirmOtpSuccess,
  fetchAuthentorUriFail,
  fetchAuthentorUriPending,
  fetchAuthentorUriSuccess,
  forgotPasswordFail,
  forgotPasswordPending,
  forgotPasswordSuccess,
  initAuthenticationFail,
  initAuthenticationPending,
  initAuthenticationSuccess,
  logout,
  resetPasswordFail,
  resetPasswordPending,
  resetPasswordSuccess,
  verificationFail,
  verificationPending,
  verificationSuccess,
} from 'store/Slices/authSlice';
import {
  checkMaintenanceFail,
  checkMaintenancePending,
  checkMaintenanceSuccess,
  fetchSettingsFail,
  fetchSettingsPending,
  fetchSettingsSuccess,
} from 'store/Slices/settingSlice';
import {
  UserRegistrationFail,
  UserRegistrationPending,
  UserRegistrationSuccess,
} from 'store/Slices/userRegistrationSlice';

export const SaveTokenInLocalStorage = (dispatch, userDetails) => {
  localStorage.setItem('CurrentUser', JSON.stringify(userDetails));
};

// Update Email
export const updateEmail = (data) => async (dispatch) => {
  dispatch(initAuthenticationPending());
  try {
    const { url, config } = updateEmailConfig();
    await axios.put(url, data, config);
    const profileConfig = getProfile();
    const profileRes = await axios.get(
      profileConfig?.url,
      profileConfig?.config
    );
    dispatch(
      authenticationSuccess({
        user: profileRes?.data?.data,
      })
    );
    toast.success('Email updated successfully');
  } catch (error) {
    toast.error('Email update failed');
  }
};
// Change Password
export const changePassword = (values) => {
  return async function (dispatch) {
    dispatch(initAuthenticationPending());
    try {
      const { url } = changePasswordConfig();
      await axios.post(url, values);
      dispatch(logout());
      toast.success(
        'Password changed successfully, Please login again using new password'
      );
    } catch (e) {
      toast.error(getError(e));
    }
  };
};

// Update User Profile
export const updateUserProfile = (profile) => {
  return async function (dispatch) {
    dispatch(initAuthenticationPending());
    try {
      const { url, config } = updateUserProfileConfig();
      await axios.put(url, profile, config);
      const profileConfig = getProfile();
      const profileRes = await axios.get(
        profileConfig?.url,
        profileConfig?.config
      );
      dispatch(
        authenticationSuccess({
          user: profileRes?.data?.data,
        })
      );
    } catch (e) {
      console.log(e);
      toast.error(getError(e));
    }
  };
};

export const getUserProfile = (token) => {
  return async (dispatch) => {
    dispatch(authenticationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/profile`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-type': 'application/json',
          'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
          tenant: 'admin',
          Authorization: `Bearer ${token}`,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(authenticationFail(error));
    }
    const res = await response.json();
    dispatch(
      authenticationSuccess({
        user: res.data,
      })
    );
    SaveTokenInLocalStorage(dispatch, res.data);
  };
};

export const signup = (
  userName,
  password,
  confirmPassword,
  email,
  fullName,
  status,
  IpAddress
) => {
  return async (dispatch) => {
    dispatch(UserRegistrationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/register-admin`,
      {
        method: 'POST',
        body: JSON.stringify({
          userName,
          password,
          confirmPassword,
          email,
          fullName,
          status,
          IpAddress,
        }),
        headers: new Headers({
          'Content-type': 'application/json',
          'admin-api-key': process.env.REACT_APP_ADMIN_APIKEY,
          tenant: 'admin',
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      let message = '';
      if (error.message === 'Email already in use') {
        message = 'Account with the same email already exits';
      } else {
        message =
          'Failed to create account, Please check your connection and try again';
      }
      dispatch(UserRegistrationFail(message));
    }
    const data = await response.json();
    dispatch(UserRegistrationSuccess(data));
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch(forgotPasswordPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/forgot-password`,
      {
        method: 'POST',
        body: JSON.stringify({
          email,
        }),
        headers: new Headers({
          'Content-type': 'application/json',
          'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
          tenant: 'admin',
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(forgotPasswordFail(error));
    }
    const data = await response.json();
    dispatch(forgotPasswordSuccess(data));
  };
};

export const passwordReset = (email, password, confirmPassword, token) => {
  return async (dispatch) => {
    dispatch(resetPasswordPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/reset-password`,
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          token,
        }),
        headers: new Headers({
          'Content-type': 'application/json',
          tenant: 'admin',
          'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(resetPasswordFail(error));
    }
    const data = await response.json();
    dispatch(resetPasswordSuccess(data));
  };
};

export const validateEmailToken = (userId, code) => {
  return async (dispatch) => {
    dispatch(verificationPending());
    const response = await fetch(
      `${
        process.env.REACT_APP_BASEURL
      }/api/identity/confirm-email?userId=${userId}&code=${code.trim()}&tenant=admin`,
      {
        method: 'GET',
        headers: new Headers({
          'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
          tenant: 'admin',
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(verificationFail(error));
    }
    const data = await response.json();
    dispatch(verificationSuccess(data));
  };
};

export const AutoAuthenticate = (dispatch) => {
  const AuthToken = localStorage.getItem('AuthToken');
  const CurrentUser = localStorage.getItem('CurrentUser');
  // const suspended = localStorage.getItem("Account-Suspended");

  // if (suspended) {
  //   dispatch(accountSuspended());
  // }
  let UserToken = '';
  if (!AuthToken) {
    dispatch(logout());
    return;
  }
  UserToken = JSON.parse(AuthToken);
  const expireDate = new Date(UserToken.refreshTokenExpiryTime);
  const todaysDate = new Date();
  if (todaysDate > expireDate) {
    return dispatch(logout());
  }
  const data = {
    token: UserToken.token,
    user: JSON.parse(CurrentUser),
  };
  dispatch(autoAuthenticationSuccess(data));
};

export const maintenanceStatus = (token) => {
  return async (dispatch) => {
    dispatch(checkMaintenancePending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/maintenance/maintenancemode/admin`,
      {
        method: 'GET',
        headers: new Headers({
          'admin-api-key': process.env.REACT_APP_ADMIN_APIKEY,
          tenant: 'admin',
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(checkMaintenanceFail(error));
    }
    const res = await response.json();
    dispatch(checkMaintenanceSuccess(res));
  };
};

export const trustedDays = () => {
  return async (dispatch) => {
    dispatch(fetchSettingsPending());
    const response = await fetch(
      `https://myreliablesite.m2mbeta.com/admin/api/v1/admin/settings/getsettingswithtenant/admin`,
      {
        method: 'GET',
        headers: new Headers({
          'admin-api-key': process.env.REACT_APP_ADMIN_APIKEY,
          tenant: 'admin',
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(fetchSettingsFail(error));
    }
    const res = await response.json();
    dispatch(fetchSettingsSuccess(res.data));
  };
};

export const loginbyOtp = (userName, otpCode) => {
  return async (dispatch) => {
    dispatch(initAuthenticationPending());
    const { ip, location } = await getIPData();
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/tokens/gettokenbyotp`,
      {
        method: 'POST',
        body: JSON.stringify({
          userName,
          otpCode,
        }),
        headers: new Headers({
          'Content-type': 'application/json',
          'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
          tenant: 'admin',
          'X-Forwarded-For': ip,
          location,
          devicename: getDeviceName(),
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(initAuthenticationFail(error));
    }
    const res = await response.json();
    dispatch(initAuthenticationSuccess(res.data));
    dispatch(getUserProfile(res.data.token));
    localStorage.setItem('AuthToken', JSON.stringify(res.data));
  };
};

export const confirmOtp = (userId, otp) => {
  return async (dispatch) => {
    dispatch(confirmOtpPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/validate-mfa`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId,
          otp,
        }),
        headers: new Headers({
          'Content-type': 'application/json',
          'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
          tenant: 'admin',
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(confirmOtpFail(error));
    }
    const res = await response.json();
    dispatch(confirmOtpSuccess(res));
    const username = localStorage.getItem('userName');
    dispatch(loginbyOtp(username, otp));
  };
};

export const validateMFA = (userId, code, isRemember) => {
  return async (dispatch) => {
    dispatch(initAuthenticationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/validate-mfa`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId,
          code,
          isRemember,
        }),
        headers: new Headers({
          'Content-type': 'application/json',
          'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
          tenant: 'admin',
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(initAuthenticationFail(error));
    }
    const res = await response.json();
    dispatch(initAuthenticationSuccess(res.tokenResponse));
    dispatch(getUserProfile(res.tokenResponse.token));
    localStorage.setItem('AuthToken', JSON.stringify(res.tokenResponse));
  };
};

export const disableConfirmOtp = (userId, otp, isRemember) => {
  return async (dispatch) => {
    dispatch(confirmOtpPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/removetwofactorauthentication`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId,
          otp,
          isRemember,
        }),
        headers: new Headers({
          'Content-type': 'application/json',
          'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
          tenant: 'admin',
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(confirmOtpFail(error));
    }
    const res = await response.json();
    dispatch(confirmOtpSuccess(res));
    const username = localStorage.getItem('userName');
    dispatch(loginbyOtp(username, otp));
  };
};

export const GetMFAUri = (userId) => {
  return async (dispatch) => {
    dispatch(fetchAuthentorUriPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/get-mfa-key`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId,
        }),
        headers: new Headers({
          'Content-type': 'application/json',
          'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
          tenant: 'admin',
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(fetchAuthentorUriFail(error));
    }
    const res = await response.json();
    dispatch(fetchAuthentorUriSuccess(res.authenticatorUri));
  };
};
