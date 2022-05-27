import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: null,
  billingSettings: null,
  maintenanceSettings: null,
  loading: false,
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setAppSettingsLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getAppSettings: (state, { payload }) => {
      state.settings = payload;
    },
    getBillingSettings: (state, { payload }) => {
      state.billingSettings = payload;
    },
    getMaintenanceSettings: (state, { payload }) => {
      state.maintenanceSettings = payload;
    },
  },
});

const { actions, reducer } = appSettingsSlice;

export const {
  setAppSettingsLoading,
  getAppSettings,
  getBillingSettings,
  getMaintenanceSettings,
} = actions;
export default reducer;
