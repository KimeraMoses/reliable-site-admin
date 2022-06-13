import {
    getError,
    axios,
    getNotificationsConfig
} from 'lib';
import { toast } from 'react-toastify';
import { getNotificationsDispatch, setNotificationLoading } from 'store/Slices';

// Get All Admin Notifications
export const getNotifications = (params = {}) => {
    return async (dispatch) => {
        dispatch(setNotificationLoading(true));
        try {
            const { url, config } = getNotificationsConfig(params);
            const res = await axios.post(url, config);
            dispatch(getNotificationsDispatch(res?.data?.data));
            dispatch(setNotificationLoading(false));
        } catch (e) {
            toast.error(getError(e));
            dispatch(setNotificationLoading(false));
        }
    };
};