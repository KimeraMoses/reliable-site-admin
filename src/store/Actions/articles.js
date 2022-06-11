import { axios, getError } from 'lib';
import {
  createArticleConfig,
  deleteArticleConfig,
  getArticleByIDConfig,
  getArticlesConfig,
  updateArticleConfig,
} from 'lib/requests/articles';
import { toast } from 'react-toastify';
import { getArticles, getArticle, setArticlesLoading } from 'store/Slices';

// Get All Articles
export const getAllArticles = () => {
  return async (dispatch) => {
    dispatch(setArticlesLoading(true));
    try {
      const { url, defaultData, config } = getArticlesConfig();
      const res = await axios.post(url, defaultData, config);
      dispatch(getArticles(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesLoading(false));
    }
  };
};

// Create an Article
export const createArticle = (data) => {
  return async (dispatch) => {
    dispatch(setArticlesLoading(true));
    try {
      const { url, config } = createArticleConfig();
      const res = await axios.post(url, data, config);
      if (res?.status === 200) {
        const { url, defaultData, config } = getArticlesConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getArticles(res?.data?.data));
      }
    } catch (e) {
      toast.error(getError(e));
    }
  };
};

// View an Article By Id
export const getArticleByID = (id) => {
  return async (dispatch) => {
    dispatch(setArticlesLoading(true));
    try {
      const { url, config } = getArticleByIDConfig(id);
      const res = await axios.get(url, config);
      dispatch(getArticle(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesLoading(false));
    }
  };
};

// Update an Article
export const updateArticle = ({ id, data }) => {
  return async (dispatch) => {
    dispatch(setArticlesLoading(true));
    try {
      const { url, config } = updateArticleConfig(id);
      const res = await axios.put(url, data, config);
      if (res.status === 200) {
        const { url, config } = getArticlesConfig();
        const res = await axios.get(url, config);
        dispatch(updateArticleConfig(res?.data?.data));
        toast.success('Article updated successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesLoading(false));
    }
  };
};

// Delete an Article
export const deleteArticle = ({ id }) => {
  return async (dispatch) => {
    dispatch(setArticlesLoading(true));
    try {
      const { url, config } = deleteArticleConfig(id);
      const res = await axios.delete(url, config);
      if (res.status === 200) {
        const { url, config } = getArticlesConfig();
        const res = await axios.get(url, config);
        dispatch(updateArticleConfig(res?.data?.data));
        toast.success('Article deleted successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesLoading(false));
    }
  };
};
