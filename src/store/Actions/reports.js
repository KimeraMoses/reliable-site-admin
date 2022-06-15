import {
  axios,
  getAnnualIncome,
  getError,
  getReportsByReplyCount,
  getReportsByResponseTime,
} from 'lib';
import { toast } from 'react-toastify';
import {
  getAnnualReportsDispatch,
  getReplyReportsDispatch,
  getResponseReportsDispatch,
  setReportsLoading,
} from 'store/Slices';

// Get Annual Reports By Year
export const getAnnualReports = ({ year }) => {
  return async (dispatch) => {
    dispatch(setReportsLoading(true));
    try {
      const { url, config } = getAnnualIncome({ year });
      const res = await axios.get(url, config);
      dispatch(getAnnualReportsDispatch(res?.data?.data?.annualIncomeDetails));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setReportsLoading(false));
    }
  };
};

// Get Response Reports By Start and End Dates
export const getResponseReports = ({ startDate, endDate }) => {
  return async (dispatch) => {
    dispatch(setReportsLoading(true));
    try {
      const { url, config } = getReportsByResponseTime({ startDate, endDate });
      const res = await axios.get(url, config);
      dispatch(
        getResponseReportsDispatch(res?.data?.data?.ticketResponseTimeDetails)
      );
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setReportsLoading(false));
    }
  };
};

// Get Reply Reports By Start and End Dates
export const getReplyReports = ({ startDate, endDate }) => {
  return async (dispatch) => {
    dispatch(setReportsLoading(true));
    try {
      const { url, config } = getReportsByReplyCount({ startDate, endDate });
      const res = await axios.get(url, config);
      dispatch(
        getReplyReportsDispatch(res?.data?.data?.noOfRepliesPerTicketsDetails)
      );
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setReportsLoading(false));
    }
  };
};
