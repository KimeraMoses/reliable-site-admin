import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  token: null,
  rToken: null,
  isLoggedIn: false,
  status: '',
  message: null,
  updateStatus: '',
  isLoading: false,
};

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    autoAuthenticationSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    initAuthenticationPending(state) {
      state.isLoading = true;
    },
    initAuthenticationSuccess(state, { payload }) {
      state.token = payload.token;
      state.rToken = payload.refreshToken;
      state.isLoading = false;
    },
    initAuthenticationFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload;
    },
    authenticationPending(state) {
      state.isLoading = true;
    },
    authenticationSuccess(state, { payload }) {
      state.user = payload.user;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    authenticationFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload;
    },
    verificationPending(state) {
      state.isLoading = true;
    },
    verificationSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    verificationFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
    forgotPasswordPending(state) {
      state.isLoading = true;
    },
    forgotPasswordSuccess(state) {
      state.isLoading = false;
    },
    forgotPasswordFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
    resetPasswordPending(state) {
      state.isLoading = true;
    },
    resetPasswordSuccess(state, { payload }) {
      state.isLoading = false;
    },
    resetPasswordFail(state, { payload }) {
      state.isLoading = false;
    },
    confirmOtpPending(state){
      state.isLoading =true
    },
    confirmOtpSuccess(state, {payload}){
      state.isLoading = false;
      state.message = payload
    },
    confirmOtpFail(state, {payload}){
      state.isLoading = false;
      state.message = payload
    },
    logout(state) {
      state.user = {};
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('AuthToken');
      localStorage.removeItem('CurrentUser');
    },
  },
});
const { reducer, actions } = authSlice;

export const {
  autoAuthenticationSuccess,
  initAuthenticationPending,
  initAuthenticationSuccess,
  initAuthenticationFail,
  authenticationPending,
  authenticationSuccess,
  authenticationFail,
  verificationPending,
  verificationSuccess,
  verificationFail,
  resetPasswordPending,
  resetPasswordSuccess,
  resetPasswordFail,
  forgotPasswordPending,
  forgotPasswordSuccess,
  forgotPasswordFail,
  confirmOtpPending,
  confirmOtpSuccess,
  confirmOtpFail,
  logout,
} = actions;

export default reducer;
