import React from 'react';
import ReactDOM from 'react-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import { BrowserRouter } from "react-router-dom";


console.log(process.env.REACT_APP_PORT);
const PORT = process.env.REACT_APP_PORT || 9000;
const REST_API_HOST = process.env.REACT_APP_REST_API_HOST || "localhost";
const REST_API_PORT = process.env.REACT_APP_REST_API_PORT || "3000";
const REST_API_PROTOCOL = process.env.REACT_APP_REST_API_PROTOCOL || "http";

//Every request will accept cookies from backend
axios.defaults.withCredentials=true;




console.log("REST_API_PORT from ENV", process.env.REACT_APP_REST_API_PORT)
console.log("REST API PORT in React ", REST_API_PORT)

console.log(process.env.PUBLIC_URL)
//axios.defaults.baseURL="http://localhost:27017/api/admin/";

axios.defaults.baseURL=REST_API_PROTOCOL+"://"+REST_API_HOST+":"+REST_API_PORT+"/api/admin";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
