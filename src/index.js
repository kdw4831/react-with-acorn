import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// App.js 를 import 해서 
import App from './App';
import reportWebVitals from './reportWebVitals';
//라우터를 사용할 준비
import {  RouterProvider } from 'react-router-dom';
// legacy_createStore 를 createStore 라는 이름으로 사용하기 (store 를 만들 함수)
import { legacy_createStore as createStore } from 'redux';
// store(저장소) 공급자 
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import { decodeToken } from 'jsontokens';

import router from './router/router';
import axios from 'axios';

// //store 에서 관리될 초기 상태값
// const initialState={
//   userName:null,
//   isLogin:false
// }

//token 이 존재 한다면 token 에서 값을 읽어와서 저장할 변수
let userName=null
let isLogin=false

//만일 토큰이 존재한다면
if(localStorage.token){
  //토큰을 디코딩
  const result=decodeToken(localStorage.token);
  //초단위
  const expTime=result.payload.exp*1000; //*1000 을 해서 ms 단위로 만들고
  //현재시간 (ms 단위)
  const now=new Date().getTime();
  //만일 유효기간이 만료 되지 않았다면
  if(expTime > now){
    userName=result.payload.sub
    isLogin=true
    //axios 의 header 에 인증정보를 기본으로 가지고 갈 수 있도록 설정
    axios.defaults.headers.common["Authorization"]="Bearer+"+localStorage.token
  }else{
    //만료된 토큰은 삭제한다
    delete localStorage.token
  }
}
//store 에서 관리될 초기 상태값
const initialState={userName,isLogin} //키값과 변수명이 동일하면 userName:userName 을 그냥 userName 으로 쓸 수 있다.


//reducer 함수
const reducer = (state=initialState, action)=>{
  let newState 
  //state 와 action 을 전달 받아서 새로운 state 를 리턴해 주면 된다
  if(action.type === "UPDATE_USER"){
    newState = {
      ...state,
      userName:action.payload
    }
  }else if(action.type === "SET_LOGIN"){
    newState ={
      ...state,
      isLogin:action.payload //boolean 값으로 전달될 예정 
    }
  }else{
    newState=state
  }
  return newState
}
//reducer 함수를 인자로 전달하면서 store(저장소) 를 만들어준다 
const store = createStore(reducer)

//id 가 root 인 곳에 UI 출력하기 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();