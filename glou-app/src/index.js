import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/index';



const root = ReactDOMClient.createRoot(document.getElementById("root"))
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
