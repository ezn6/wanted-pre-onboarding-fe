import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import TokenStorage from './service/token';
import Auth from './service/auth';
import TodoService from './service/todoService';

const tokenStorage = new TokenStorage();
const auth = new Auth(tokenStorage);
const todoService = new TodoService(tokenStorage);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App auth={auth} token={tokenStorage} todoService={todoService} />
    </BrowserRouter>
  </React.StrictMode>
);
