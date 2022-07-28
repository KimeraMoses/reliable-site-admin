import React from 'react';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/index';
import './lang/i18n';
import setUpInterceptor from 'lib/axios-interceptors';

setUpInterceptor(store);

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
  document.getElementById('root')
);
