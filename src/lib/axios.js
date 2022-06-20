import axiosMain from 'axios';

export const axios = axiosMain.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

function setCurrentTokenState(tokenState) {
  localStorage.setItem('AuthToken', JSON.stringify(tokenState));
}

function getCurrentTokenState() {
  const AuthToken = localStorage.getItem('AuthToken');
  const tokenObj = JSON.parse(AuthToken);
  return tokenObj;
}

function refreshToken() {
  const current = getCurrentTokenState();
  return axiosMain.post(
    `${process.env.REACT_APP_BASEURL}/api/tokens/refresh`,
    {
      token: current?.token,
      refreshToken: current?.refreshToken,
    },
    {
      headers: {
        'Content-type': 'application/json',
        'gen-api-key': process.env.REACT_APP_GEN_APIKEY,
        tenant: 'admin',
      },
    }
  );
}

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

// axios.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     if (err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;
//         try {
//           const rs = await refreshToken();
//           const newToken = rs?.data?.data;
//           setCurrentTokenState(newToken);
//           axios.defaults.headers.common[
//             'Authorization'
//           ] = `Bearer ${newToken?.token}`;
//           return axios(originalConfig);
//         } catch (_error) {
//           if (_error.response && _error.response.data) {
//             return Promise.reject(_error.response.data);
//           }
//           return Promise.reject(_error);
//         }
//       }
//       if (err.response.status === 403 && err.response.data) {
//         return Promise.reject(err.response.data);
//       }
//     }
//     return Promise.reject(err);
//   }
// );

let refreshing_token = null;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    if (error.response && error.response.status === 401 && !config._retry) {
      config._retry = true;
      try {
        refreshing_token = refreshing_token ? refreshing_token : refreshToken();
        let res = await refreshing_token;
        refreshing_token = null;
        if (res.data?.data?.token) {
          setCurrentTokenState(res?.data?.data);
        }
        return axios(config);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
