import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  user: null,
  loading: false,
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state, { payload }) => {
      state.users = payload;
    },
    getUser: (state, { payload }) => {
      state.user = payload;
    },
    setUserLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

const { reducer, actions } = usersSlice;
export const { getUser, getUsers, setUserLoading } = actions;

export default reducer;
