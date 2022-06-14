import { axios, getAnnualIncome, getError } from 'lib';
import { toast } from 'react-toastify';
import { getAnnualReportsDispatch, setReportsLoading } from 'store/Slices';

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
