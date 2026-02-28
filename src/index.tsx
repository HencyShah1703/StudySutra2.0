import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Theme appearance="inherit" radius="large" scaling="100%">
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="colored"
    />
  </Theme>
);
