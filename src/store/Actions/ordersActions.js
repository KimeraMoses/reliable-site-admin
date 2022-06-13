import {
    getError,
    axios,
    getOrdersConfig
} from 'lib';
import { toast } from 'react-toastify';
import { getOrdersDispatch, setOrderLoading } from 'store/Slices';


// Get All Admin Orders
export const getOrders = (params = {}) => {
    return async (dispatch) => {
        dispatch(setOrderLoading(true));
        try {
            const { url, defaultData, config } = getOrdersConfig(params);
            if (params?.status) {
                defaultData.advancedSearch.fields.push('status');
                defaultData.advancedSearch.keyword = params?.status;
            }
            if (params?.userId) {
                defaultData['userId'] = params?.userId;
            }
            if (params?.startDate && params?.endDate) {
                defaultData['startDate'] = params?.startDate;
                defaultData['endDate'] = params?.endDate;
            }

            const res = await axios.post(url, defaultData, config);
            dispatch(getOrdersDispatch(res?.data?.data));
            dispatch(setOrderLoading(false));
        } catch (e) {
            toast.error(getError(e));
            dispatch(setOrderLoading(false));
        }
    };
};