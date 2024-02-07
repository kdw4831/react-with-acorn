import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// App.js를 import 해서 App이라는 이름으로 사용하겠다라는 의미
import App from './App';
import reportWebVitals from './reportWebVitals';


// id가 root인 곳에 UI 출력하기
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
