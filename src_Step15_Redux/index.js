import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// App.js를 import 해서
import App from './App2';

//legacy_createStore를 createStore라는 이름으로 사용하기(store를 만들 함수)
import { legacy_createStore as createStore } from 'redux';
import reportWebVitals from './reportWebVitals';
//store(저장소) 공급자
import { Provider } from 'react-redux';
//store 에서 관리될 초기 상태값
const initialState={
  userName:null,
  isLogin:false
}



//reducer  함수     최근 상태값 전달
const reducer=(state=initialState,action)=>{
  let newState
  //state와 action을 전달받아서 새로운 state를 리턴해주면된다.
  if(action.type=== "UPDATE_USER"){// type 수행할 액션의 종류
    newState={
      ...state,
      userName:action.payload  //payload: action에 필요한 데이터
    } 

  }else if(action.type==="SET_LOGIN"){
    newState={
      ...state,
      isLogin:action.payload // boolean 값으로 전달될 예정
    }
  }else{
    newState=state
  }

  return newState 
}

// reducer 함수를 인자로 전달하면서 store(저장소)를 만들어진다.
const store= createStore(reducer)

// id가 root인 곳에 UI 출력하기
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
