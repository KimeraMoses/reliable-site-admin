import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allOrders: [],
  loading: false,
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getOrders: (state, { payload }) => {
      state.orders = payload;
    },
    setOrderLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getAllOrders: (state, { payload }) => {
      state.allOrders = payload;
    },
  },
});

const { reducer, actions } = ordersSlice;
export const { getOrders, setOrderLoading, getAllOrders } = actions;

export default reducer;
