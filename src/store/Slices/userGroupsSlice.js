import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userGroups: {},
};
const settingSlice = createSlice({
  name: 'userGroups',
  initialState,
  reducers: {
    getGroups: (state, { payload }) => {
      state.userGroups = payload;
    },
  },
});

const { reducer, actions } = settingSlice;

export const { getAppLevelModules, getUserLevelModules } = actions;
export default reducer;
