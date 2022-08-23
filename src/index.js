import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import TokenStorage from './service/token';
import Auth from './service/auth';

const tokenStorage = new TokenStorage();
const auth = new Auth(tokenStorage);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App auth={auth} />
    </BrowserRouter>
  </React.StrictMode>
);
