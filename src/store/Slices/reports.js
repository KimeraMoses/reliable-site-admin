// getAllProducts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  annualReports: [],
  filteredReports: [],
  replyReports: [],
  responseReports: [],
  loading: false,
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getAnnualReportsDispatch: (state, { payload }) => {
      state.annualReports = payload;
    },
    getFilteredReportsDispatch: (state, { payload }) => {
      state.filteredReports = payload;
    },
    getReplyReportsDispatch: (state, { payload }) => {
      state.replyReports = payload;
    },
    getResponseReportsDispatch: (state, { payload }) => {
      state.responseReports = payload;
    },
    setReportsLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

const { reducer, actions } = productsSlice;
export const {
  getAnnualReportsDispatch,
  getFilteredReportsDispatch,
  getReplyReportsDispatch,
  getResponseReportsDispatch,
  setReportsLoading,
} = actions;

export default reducer;
