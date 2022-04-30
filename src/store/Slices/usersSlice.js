import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state, { payload }) => {
      state.users = payload;
    },
    setUserLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

const { reducer, actions } = usersSlice;
export const { getUsers, setUserLoading } = actions;

export default reducer;
