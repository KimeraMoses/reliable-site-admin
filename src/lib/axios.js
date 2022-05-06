import axiosMain from 'axios';

export const axios = axiosMain.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

axios.interceptors.request.use(
  function (config) {
    const AuthToken = localStorage.getItem('AuthToken');
    const tokenObj = JSON.parse(AuthToken);
    const token = tokenObj?.token;
    config.headers = {
      ...config.headers,
      'Content-type': 'application/json',
      'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
      tenant: 'admin',
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
