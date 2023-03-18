import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './styles/index.css';
import { App } from './components';
import { AuthProvider,PostsProvider } from './providers';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </AuthProvider>
    <ToastContainer autoClose={5000} position="top-right"/>
  </React.StrictMode>
);

