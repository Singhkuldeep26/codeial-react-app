import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './styles/index.css';
import { App } from './components';
import { AuthProvider } from './providers/AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer autoClose={5000} position="top-right"/>
  </React.StrictMode>
);

