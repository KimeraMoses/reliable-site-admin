import {
  axios,
  getError,
  addNotificationTemplateConfig,
  editNotificationTemplateConfig,
  getNotificationTemplatesConfig,
  getNotificationTemplateByIDConfig,
  deleteNotificationTemplateConfig,
} from 'lib';
import { toast } from 'react-toastify';
import { getTemplates, getTemplate, setNTLoading } from 'store/Slices';

export const getNotificationTemplates = () => {
  return async (dispatch) => {
    dispatch(setNTLoading(true));
    try {
      const { url, defaultData, config } = getNotificationTemplatesConfig();
      const response = await axios.post(url, defaultData, config);
      dispatch(getTemplates(response?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setNTLoading(false));
    }
  };
};

export const getNotificationTemplateByID = ({ id }) => {
  return async (dispatch) => {
    dispatch(setNTLoading(true));
    try {
      const { url, defaultData, config } = getNotificationTemplateByIDConfig({
        id,
      });
      const response = await axios.get(url, defaultData, config);
      dispatch(getTemplate(response?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setNTLoading(false));
    }
  };
};

export const addNotificationTemplate = ({ data }) => {
  return async (dispatch) => {
    dispatch(setNTLoading(true));
    try {
      const { url, config } = addNotificationTemplateConfig();
      const response = await axios.post(url, data, config);
      if (response.status === 200) {
        const { url, defaultData, config } = getNotificationTemplatesConfig();
        const response = await axios.post(url, defaultData, config);
        dispatch(getTemplates(response?.data?.data));
        toast.success('Notification Template Added Successfully');
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setNTLoading(false));
    }
  };
};

export const editNotificationTemplate = ({ data }) => {
  return async (dispatch) => {
    dispatch(setNTLoading(true));
    try {
      const { url, config } = editNotificationTemplateConfig({ id: data?.id });
      const response = await axios.put(url, data, config);
      if (response.status === 200) {
        const { url, defaultData, config } = getNotificationTemplatesConfig();
        const response = await axios.post(url, defaultData, config);
        dispatch(getTemplates(response?.data?.data));
        toast.success('Notification Template Updated Successfully');
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setNTLoading(false));
    }
  };
};

export const deleteNotificationTemplate = ({ id }) => {
  return async (dispatch) => {
    dispatch(setNTLoading(true));
    try {
      const { url, config } = deleteNotificationTemplateConfig({ id });
      const response = await axios.delete(url, config);
      if (response.status === 200) {
        const { url, defaultData, config } = getNotificationTemplatesConfig();
        const response = await axios.post(url, defaultData, config);
        dispatch(getTemplates(response?.data?.data));
        toast.success('Notification Template Deleted Successfully');
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setNTLoading(false));
    }
  };
};
