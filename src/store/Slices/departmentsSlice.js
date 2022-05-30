import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    departments: [],
    loading: false
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
    },
});

const { reducer, actions } = departmentsSlice;
export const { getDepartments, setDepartmentsLoading } = actions;

export default reducer;
