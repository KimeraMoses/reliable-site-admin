import {
  getError,
  axios,
  getTicketsConfig,
  getTicketConfig,
  editTicketConfig,
  createTicketConfig,
  getTicketsByClintIDConfig,
  getAssignedTicketsByIDConfig,
  getTicketsByDepartmentIdConfig,
} from 'lib';
import { toast } from 'react-toastify';
import {
  getTicketsDispatch,
  setTicketLoading,
  getTicket,
  setTicketCommentLoading,
} from 'store/Slices';

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
      dispatch(getTicket(null));
      dispatch(setTicketLoading(false));
    }
  };
};

export const getTicketsByClientID = ({ id }) => {
  return async (dispatch) => {
    dispatch(setTicketLoading(true));
    try {
      const { url, config } = getTicketsByClintIDConfig({ id });
      const res = await axios.get(url, config);
      dispatch(getTicketsDispatch(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
      dispatch(getTicketsDispatch([]));
    } finally {
      dispatch(setTicketLoading(false));
    }
  };
};

export const getTicketsByAdminID = ({ id }) => {
  // getAssignedTicketsByIDConfig
  return async (dispatch) => {
    dispatch(setTicketLoading(true));
    try {
      const { url, defaultData, config } = getAssignedTicketsByIDConfig({ id });
      const res = await axios.post(url, defaultData, config);
      dispatch(getTicketsDispatch(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
      dispatch(getTicketsDispatch([]));
    } finally {
      dispatch(setTicketLoading(false));
    }
  };
};
// getTicketsByDepartmentId
export const getTicketsByDepartmentId = ({ id }) => {
  // getAssignedTicketsByIDConfig
  return async (dispatch) => {
    dispatch(setTicketLoading(true));
    try {
      const { url, defaultData, config } = getTicketsByDepartmentIdConfig({
        id,
      });
      const res = await axios.post(url, defaultData, config);
      dispatch(getTicketsDispatch(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
      dispatch(getTicketsDispatch([]));
    } finally {
      dispatch(setTicketLoading(false));
    }
  };
};

export const editTicket = ({ data }) => {
  return async (dispatch) => {
    dispatch(setTicketCommentLoading(true));
    try {
      const { url, config } = editTicketConfig({ id: data?.id });
      const response = await axios.put(url, data, config);
      if (response.status === 200) {
        toast.success('Ticket Updated Successfully');
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setTicketCommentLoading(false));
    }
  };
};

export const createTicket = ({ data }) => {
  return async (dispatch) => {
    dispatch(setTicketLoading(true));
    try {
      const { url, config } = createTicketConfig();
      const response = await axios.post(url, data, config);
      if (response.status === 200) {
        toast.success('Ticket Created Successfully!');
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setTicketLoading(false));
    }
  };
};
