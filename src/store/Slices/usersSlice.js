import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  user: null,
  clients:[],
  userSettings: null,
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
    getClients: (state, { payload }) => {
      state.clients = payload;
    },
    getUser: (state, { payload }) => {
      state.user = payload;
    },
    getUserSettingsSlice: (state, { payload }) => {
      state.userSettings = payload;
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
export const {
  getUser,
  getUsers,
  getClients,
  setUserLoading,
  getUserModule,
  getUserSettingsSlice,
} = actions;

export default reducer;
