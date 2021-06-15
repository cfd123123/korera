import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'; //this is middleware
import authReducer from './store/reducers/auth';
import resourceReducer from './store/reducers/resource'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

axios.interceptors.request.use(request => {
  if (localStorage.getItem('token') != null) {
    const token = localStorage.getItem('token');
    request.headers.Authorization = `Bearer ${token}`;
  }
  console.log(request);
  return request;
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//return whole reducer
const rootReducer = combineReducers({
  auth: authReducer,
  resource:resourceReducer
});
                          //if we don;t use middleware, just put composeEnhancers() there
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)       //We need to do it if we want to use middleware
));


const app = (
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);





ReactDOM.render(app , document.getElementById('root')) 
/*
ReactDOM.render(<Provider store = {store}>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>   
                </Provider>, document.getElementById('root')) 
*/

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
