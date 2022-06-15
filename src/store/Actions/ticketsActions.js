import {
    getError,
    axios,
    getTicketsConfig,
    getTicketConfig
} from 'lib';
import { toast } from 'react-toastify';
import { getTicketsDispatch, setTicketLoading, getTicket } from 'store/Slices';


// Get All Admin Ticket
export const getTickets = (params = []) => {
    return async (dispatch) => {
        dispatch(setTicketLoading(true));
        try {
            const { url, defaultData, config } = getTicketsConfig();
            const res = await axios.post(url, defaultData, config);
            dispatch(getTicketsDispatch(res?.data?.data));
            dispatch(setTicketLoading(false));
        } catch (e) {
            toast.error(getError(e));
            dispatch(setTicketLoading(false));
        }
    };
};


// Get Ticket By ID
export const getTicketById = (id) => {
    return async (dispatch) => {
        dispatch(setTicketLoading(true));
        try {
            const { url, config } = getTicketConfig(id);
            const res = await axios.get(url, config);
            dispatch(getTicket(res?.data?.data));
            dispatch(setTicketLoading(false));
        } catch (e) {
            toast.error(getError(e));
            dispatch(setTicketLoading(false));
        }
    };
};