import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  validatedData: [],
  error: false,
  loading: false,
  whmcsFileType: 0,
};
const whmcsSlice = createSlice({
  name: 'whmcs',
  initialState,
  reducers: {
    getValidateData: (state, { payload }) => {
      state.validatedData = payload;
    },
    setWHMCSFileType: (state, { payload }) => {
      state.whmcsFileType = payload;
    },
    setWHMCSLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setWHMCSError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

const { reducer, actions } = whmcsSlice;
export const {
  getValidateData,
  setWHMCSFileType,
  setWHMCSLoading,
  setWHMCSError,
} = actions;

export default reducer;
