import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apiKeys: [],
  loading: false,
};
const apiKeysSlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    getAPIKeys: (state, { payload }) => {
      state.apiKeys = payload;
    },
    setAPILoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

const { reducer, actions } = apiKeysSlice;

export const { getAPIKeys, setAPILoading } = actions;
export default reducer;
