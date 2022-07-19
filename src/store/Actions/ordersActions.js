import {
  getError,
  axios,
  getOrdersConfig,
  createOrderConfig,
  getOrderTemplatesConfig,
  createOrderTemplateConfig,
  editOrderTemplateConfig,
} from 'lib';
import { toast } from 'react-toastify';
import {
  getOrdersDispatch,
  getOrderTemplatesDispatch,
  setOrderLoading,
} from 'store/Slices';

export const createOrder = ({ data }) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url, config } = createOrderConfig();
      const res = await axios.post(url, data, config);
      if (res?.status === 200) {
        const { url, defaultData, config } = getOrdersConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getOrdersDispatch(res?.data?.data));
      }
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Get All Admin Orders
export const getOrders = (params) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url, defaultData, config } = getOrdersConfig();
      const res = await axios.post(url, defaultData, config);
      dispatch(getOrdersDispatch(res?.data?.data));
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    }
  };
};

// Get All Order Templates
export const getOrderTemplates = () => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url, defaultData, config } = getOrderTemplatesConfig();
      const res = await axios.post(url, defaultData, config);
      dispatch(getOrderTemplatesDispatch(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Create Order Template
export const createOrderTemplate = ({ data }) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url, config } = createOrderTemplateConfig();
      const res = await axios.post(url, data, config);
      if (res?.status === 200) {
        const { url, defaultData, config } = getOrderTemplatesConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getOrderTemplates(res?.data?.data));
      }
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Edit Order Template
export const editOrderTemplate = ({ data }) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url, config } = editOrderTemplateConfig({ id: data?.id });
      const res = await axios.put(url, data, config);
      if (res?.status === 200) {
        const { url, defaultData, config } = getOrderTemplatesConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getOrderTemplates(res?.data?.data));
      }
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};
