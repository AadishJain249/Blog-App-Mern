import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'
import 'material-icons/iconfont/material-icons.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
    {/* <BrowserRouter> */}
    <HashRouter>
    <App />
    </HashRouter>   
    {/* </BrowserRouter> */}
    </Provider>
);
reportWebVitals();
