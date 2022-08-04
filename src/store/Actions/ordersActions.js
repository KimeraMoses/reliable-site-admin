import {
  getError,
  axios,
  getOrdersConfig,
  createOrderConfig,
  getOrderTemplatesConfig,
  createOrderTemplateConfig,
  editOrderTemplateConfig,
} from "lib";
import { toast } from "react-toastify";
import {
  getOrdersDispatch,
  getOrderTemplatesDispatch,
  setOrderLoading,
  getOrderTemplate,
  // getOrder,
} from "store/Slices";

export const createOrder = ({ data }) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    console.log("order data", data);
    try {
      const { url, config } = createOrderConfig();
      const res = await axios.post(url, data, config);
      console.log("order res", res);
      if (res?.status === 200) {
        const { url, defaultData, config } = getOrdersConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getOrdersDispatch(res?.data?.data));
        toast.success("Order created successfully");
      }
    } catch (e) {
      console.log(e);
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
    console.log("order data", data);
    try {
      const { url, config } = createOrderTemplateConfig();
      const res = await axios.post(url, data, config);
      console.log("order res", res);
      if (res?.status === 200) {
        const { url, defaultData, config } = getOrderTemplatesConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getOrderTemplates(res?.data?.data));
      }
    } catch (e) {
      console.log("order err", e);
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Get Order Template By ID
export const getOrderTemplateByID = (id) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/ordertemplates/${id}`);
      dispatch(getOrderTemplate(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Edit Order Template By ID
export const editOrderTemplateByID = (id, data) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const res = await axios.put(`/api/v1/admin/ordertemplates/${id}`, data);
      if (res?.status === 200) {
        const { url, defaultData, config } = getOrderTemplatesConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getOrderTemplatesDispatch(res?.data?.data));
      }
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Delete Order Template By ID
export const deleteOrderTemplateByID = (id) => {
  console.log(id);
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const res = await axios.delete(`/api/v1/admin/ordertemplates/${id}`);
      if (res?.status === 200) {
        const { url, defaultData, config } = getOrderTemplatesConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getOrderTemplatesDispatch(res?.data?.data));
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
