import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // App 컴포넌트가 여기로 들어옴
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
// redux store 에서 promise를 받게 해줌
import promiseMiddleware from 'redux-promise';
// redux store 에서 function을 받게 해줌
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'; // /index.js 안붙여도 자동으로 찾아줌


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(

  // App 에 Redux 연결
  <Provider
   store={createStoreWithMiddleware(Reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App /> 
  </Provider>
  
  
  
  , document.getElementById('root')); 
  // root : public - index.html 에서 가져옴
  // root elements가 <App /> 이라고 정의해주는 것
 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
