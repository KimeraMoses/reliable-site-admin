import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  user: null,
  loading: false,
  userModules: [],
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
    getUserModule: (state, { payload }) => {
      state.userModules = payload;
    },
  },
});

const { reducer, actions } = usersSlice;
export const { getUser, getUsers, setUserLoading, getUserModule } = actions;

export default reducer;
