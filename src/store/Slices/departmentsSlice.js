import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  departments: [],
  userDepartments: [],
  loading: false,
};
const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    getDepartments: (state, { payload }) => {
      state.departments = payload;
    },
    setDepartmentsLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getUsersDepartmentsDispatch: (state, { payload }) => {
      state.userDepartments = payload;
    },
  },
});

const { reducer, actions } = departmentsSlice;
export const {
  getDepartments,
  setDepartmentsLoading,
  getUsersDepartmentsDispatch,
} = actions;

export default reducer;
