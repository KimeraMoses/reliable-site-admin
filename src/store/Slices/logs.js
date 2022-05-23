import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logs: [],
  userLogs: [],
  loading: false,
  loginSessions: [],
};
const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    getLogsSlice: (state, { payload }) => {
      state.logs = payload;
    },
    getUserLogsSlice: (state, { payload }) => {
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

const { reducer, actions } = logsSlice;

export const {
  getLogsSlice,
  getUserLogsSlice,
  getLoginSessionsSlice,
  setLogsLoading,
} = actions;
export default reducer;
