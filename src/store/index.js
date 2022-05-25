import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import regReducer from './Slices/userRegistrationSlice';
import settingReducer from './Slices/settingSlice';
import moduleReducer from './Slices/moduleSlice';
import usersReducer from './Slices/usersSlice';
import userGroupsReducer from './Slices/userGroupsSlice';
import logsReducer from './Slices/logs';
import apiKeysReducer from './Slices/apiKeysSlice';
import appSettingsReducer from './Slices/appSettings';
import paymentGateways from './Slices/paymentGateways';
import smtpReducer from './Slices/smtp';

const store = configureStore({
  reducer: {
    auth: authReducer,
    reg: regReducer,
    settings: settingReducer,
    modules: moduleReducer,
    users: usersReducer,
    userGroups: userGroupsReducer,
    logs: logsReducer,
    apiKeys: apiKeysReducer,
    appSettings: appSettingsReducer,
    paymentGateways: paymentGateways,
    smtps: smtpReducer,
  },
});

export default store;
export const messageNotifications = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
export * from './Actions';
export * from './Slices';
