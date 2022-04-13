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
    getUserLevelModules: (state, { payload }) => {
      state.userModules = payload;
    },
  },
});

const { reducer, actions } = settingSlice;

export const { getAppLevelModules, getUserLevelModules } = actions;
export default reducer;
