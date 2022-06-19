import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tickets: [],
    loading: false,
    ticket: null
};

const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        getTickets: (state, { payload }) => {
            state.tickets = payload;
        },
        getTicket: (state, { payload }) => {
            state.ticket = payload;
        },
        setTicketLoading: (state, { payload }) => {
            state.loading = payload;
        },
        
    }
})

const { reducer, actions } = ticketsSlice;
export const { getTickets, getTicket, setTicketLoading } = actions;

export default reducer;