import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  article: null,
  loading: false,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticlesLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getArticles: (state, { payload }) => {
      state.articles = payload;
    },
    getArticle: (state, { payload }) => {
      state.article = payload;
    },
  },
});

const { actions, reducer } = articlesSlice;

export const { setArticlesLoading, getArticles, getArticle } = actions;

export default reducer;
