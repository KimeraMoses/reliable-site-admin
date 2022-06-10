import { getConfig } from 'lib';

const ArticleFeedback = 'Users';

const prefix = '/api/articlefeedbacks';
const articleFeedbackConfig = (action) =>
  getConfig({ module: ArticleFeedback, action });

// Get Articles Feedback
export const getArticleFeedbackConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: '',
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: '',
  },
  config: articleFeedbackConfig('View'),
});

// Create Article Feedback
export const createArticleFeedbackConfig = () => ({
  url: prefix,
  config: articleFeedbackConfig('Create'),
});

// Delete Article Feedback
export const deleteArticleFeedbackConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: articleFeedbackConfig('Remove'),
});

// Update Article Feedback
export const updateArticleFeedbackConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: articleFeedbackConfig('Update'),
});

// Get Article Feedback By ID
export const getArticleFeedbackByIDConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: articleFeedbackConfig('View'),
});
