import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allOrders: [],
  loading: false,
  orders: [],
  orderTemplates: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getOrderTemplates: (state, { payload }) => {
      state.orderTemplates = payload;
    },
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
export const { getOrders, setOrderLoading, getOrderTemplates, getAllOrders } =
  actions;

export default reducer;
