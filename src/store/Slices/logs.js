import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logs: [],
  loading: false,
};
const settingSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    getLogsSlice: (state, { payload }) => {
      state.logs = payload;
    },
    setLogsLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

const { reducer, actions } = settingSlice;

export const { getLogsSlice, setLogsLoading } = actions;
export default reducer;
