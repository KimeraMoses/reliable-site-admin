import {
    getError,
    axios,
    getTicketCommentsConfig,
    addTicketCommentConfig,
    getTicketConfig
} from 'lib';
import { toast } from 'react-toastify';
import { getTicketCommentsDispatch, setTicketCommentLoading, getTicket, setTicketLoading } from 'store/Slices';


// Get All Admin Ticket Comments
export const getTicketComments = (params = []) => {
    return async (dispatch) => {
        dispatch(setTicketCommentLoading(true));
        try {
            const { url, defaultData, config } = getTicketCommentsConfig();

            if (params?.ticketId) {
                defaultData.advancedSearch.fields.push('ticketId');
                defaultData.advancedSearch.keyword = params?.ticketId;
            }
            const res = await axios.post(url, defaultData, config);
            dispatch(getTicketCommentsDispatch(res?.data?.data));
            dispatch(setTicketCommentLoading(false));
        } catch (e) {
            toast.error(getError(e));
            dispatch(setTicketCommentLoading(false));
        }
    };
};


// Add Replies
export const addTicketComments = (data) => {
    return async (dispatch) => {
        dispatch(setTicketCommentLoading(true));
        try {
            const { url, config } = addTicketCommentConfig();
            const res = await axios.post(url, data, config);
            if (res.status === 200) {
                toast.success('Ticket Comments Added Successfully');

            }
        } catch (e) {
            toast.error(getError(e));
        } finally {
            dispatch(setTicketCommentLoading(false));
        }
    };
};
