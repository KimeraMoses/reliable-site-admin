import { getConfig } from 'lib';

const Articles = 'Users';
const prefix = '/api/v1/admin/articles';
const articlesConfig = (action) => getConfig({ module: Articles, action });

// Get Articles
export const getArticlesConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: [''],
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
    categoryId: '',
    minimumRate: 0,
    maximumRate: 0,
  },
  config: articlesConfig('View'),
});

// Create Article
export const createArticleConfig = () => ({
  url: prefix,
  config: articlesConfig('Create'),
});

// Delete Article
export const deleteArticleConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: articlesConfig('Remove'),
});

// Update Article
export const updateArticleConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: articlesConfig('Update'),
});

// Get Article By ID
export const getArticleByIDConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: articlesConfig('View'),
});
