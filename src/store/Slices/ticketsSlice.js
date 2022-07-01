import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  departmentTickets: [],
  loading: false,
  detailsLoading: false,
  ticket: null,
  allTickets: [],
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    getTickets: (state, { payload }) => {
      state.tickets = payload;
    },
    getAllTickets: (state, { payload }) => {
      state.allTickets = payload;
    },
    getDepartmentTickets: (state, { payload }) => {
      state.departmentTickets = payload;
    },
    getTicket: (state, { payload }) => {
      state.ticket = payload;
    },
    setTicketLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setDetailsLoading: (state, { payload }) => {
      state.detailsLoading = payload;
    },
  },
});

const { reducer, actions } = ticketsSlice;
export const {
  getTickets,
  getAllTickets,
  getTicket,
  setTicketLoading,
  getDepartmentTickets,
  setDetailsLoading,
} = actions;

export default reducer;
