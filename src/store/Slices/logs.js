import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logs: [],
  loading: false,
  loginSessions: [],
};
const settingSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    getLogsSlice: (state, { payload }) => {
      state.logs = payload;
    },
    getLoginSessionsSlice: (state, { payload }) => {
      state.loginSessions = payload;
    },
    setLogsLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

const { reducer, actions } = settingSlice;

export const { getLogsSlice, getLoginSessionsSlice, setLogsLoading } = actions;
export default reducer;
