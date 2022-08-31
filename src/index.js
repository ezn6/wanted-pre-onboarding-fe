import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import TokenStorage from './service/token';
import Auth from './service/auth';
import TodoService from './service/todoService';
import FetchClient from './service/fetch';

const baseURL = process.env.REACT_APP_BASE_URL;
const fetchClient = new FetchClient(baseURL);
const tokenStorage = new TokenStorage();
const auth = new Auth(tokenStorage, fetchClient);
const todoService = new TodoService(tokenStorage, fetchClient);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App auth={auth} token={tokenStorage} todoService={todoService} />
    </BrowserRouter>
  </React.StrictMode>
);
