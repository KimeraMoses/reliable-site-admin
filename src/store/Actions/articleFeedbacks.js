import { axios, getError } from 'lib';
import {
  createArticleFeedbackConfig,
  deleteArticleFeedbackConfig,
  getArticleFeedbackByIDConfig,
  updateArticleFeedbackConfig,
} from 'lib/requests/ArticleFeedbacks';

import { toast } from 'react-toastify';
import {
  setArticlesFeedbackLoading,
  getArticleFeedbacks,
  getArticleFeedback,
} from 'store/Slices';

// Get All Articles Feedback
export const getAllArticleFeedbacks = () => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackLoading(true));
    try {
      const { url, defaultData, config } = getArticleFeedbacks();
      const res = await axios.post(url, defaultData, config);
      dispatch(getArticleFeedback(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesFeedbackLoading(false));
    }
  };
};

// Create an Article Feedback
export const createArticleFeedback = (data) => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackLoading(true));
    try {
      const { url, config } = createArticleFeedbackConfig();
      const res = await axios.post(url, data, config);
      if (res?.status === 200) {
        const { url, defaultData, config } = getArticleFeedbacks();
        const res = await axios.post(url, defaultData, config);
        dispatch(getArticleFeedback(res?.data?.data));
      }
    } catch (e) {
      toast.error(getError(e));
    }
  };
};

// View an Article Feedback By Id
export const getArticleFeedbackByID = (id) => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackLoading(true));
    try {
      const { url, config } = getArticleFeedbackByIDConfig(id);
      const res = await axios.get(url, config);
      dispatch(getArticleFeedback(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesFeedbackLoading(false));
    }
  };
};

// Update an Article Feedback
export const updateArticleFeedback = ({ id, data }) => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackLoading(true));
    try {
      const { url, config } = updateArticleFeedbackConfig(id);
      const res = await axios.put(url, data, config);
      if (res.status === 200) {
        const { url, config } = getArticleFeedbackByIDConfig(id);
        const res = await axios.get(url, config);
        dispatch(updateArticleFeedbackConfig(res?.data?.data));
        toast.success('Article Feedback updated successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesFeedbackLoading(false));
    }
  };
};

// Delete an Article Feedback
export const deleteArticle = ({ id }) => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackLoading(true));
    try {
      const { url, config } = deleteArticleFeedbackConfig(id);
      const res = await axios.delete(url, config);
      if (res.status === 200) {
        const { url, config } = getArticleFeedbackByIDConfig(id);
        const res = await axios.get(url, config);
        dispatch(updateArticleFeedbackConfig(res?.data?.data));
        toast.success('Article Feedback deleted successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesFeedbackLoading(false));
    }
  };
};
