// App.css 적용하기 (내부 css)
import { useState } from 'react';
import './App.css'
import Todo from './components/Todo';
import Todo2 from './components/Todo2';
import Fortune from './components/Fortune';
import Fortune2 from './components/Fortune2';

//함수형 component
function App() {
  const[isShow,setShow]=useState(false)
  const handleChange =(e)=>{
    setShow(e.target.checked)
  }
  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
      <label>
        Todo,Fortune <input type="checkBox" checked={isShow} onChange={handleChange}/>
      </label>
      {isShow &&<Todo></Todo>}
      {isShow &&<Todo2></Todo2>}
      {isShow &&<Fortune msg="동쪽으로 가면 귀인을 만나요"></Fortune>}
      {isShow &&<Fortune2 msg="오후에 비가 그칠거에요"></Fortune2>}
    </div>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;

