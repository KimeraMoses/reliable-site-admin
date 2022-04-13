import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appModules: {},
  userModules: {},
};
const settingSlice = createSlice({
  name: 'moduleManagement',
  initialState,
  reducers: {
    getAppLevelModules: (state, { payload }) => {
      state.appModules = payload;
    },
    fetchSettingsFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
  },
});

const { reducer, actions } = settingSlice;

export const { getAppLevelModules } = actions;
export default reducer;
