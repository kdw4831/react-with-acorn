// App.css 적용하기 (내부 css)
import { useRef, useState } from 'react';
import './App.css'
import { Link } from 'react-router-dom';
import MyCounter from './components/MyCounter';
import MyCounter2 from './components/MyCounter2';
import YourCount from './components/YourCount';
import Friends from './components/Friends';


//함수형 component
function App() {
  const[name,setName]=useState("kim") //상태값, 상태를 변화시킬 함수
  const[count,setCount]=useState(0)
  const[state,setState]=useState({name:"kim",count:0})
  const[names,setNames]=useState(["kim"])
  const[seq,setSeq]=useState(0)
  let inputName= useRef()

  console.log("함수가 호출됨")
  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
      <button onClick={()=>{
        setName("박") // state=>변경 => UI를 update 하기위해 => App() 함수가 다시 호출된다,.
      }}>{name}</button>

      <button onClick={()=>{
        setCount(999)
      }}>{count}</button>

      <button onClick={()=>{
        setState({
          ...state,//기존의 object안에 들어있는 내용을 여기에 펼쳐 놓고  수정하고 싶은 값만 수정
          name:"park",    // 상태값으로 관리되던 기존에 object를 새로운 object로 덮어쓰기
          
        })
      }}>{state.name}</button>
      <button onClick={()=>{
        setState({
          ...state,
          count:999
        })
      }}>{state.count}</button>
      {/* --------------------------------------------------------------- */}
      <br />
      <button onClick={()=>{
        //setNames([...names,"park"])
        setNames(names.concat("park"))
      }}>추가하기</button>

      <ul>
        {names.map(item=><li>{item}</li>)}
      </ul>

     
      <input type="text" ref={inputName} id="one"/>
      <button onClick={()=>{
        //여기에서 만일 특정 문서 객체의 참조값이 필요 하다면?
        alert(inputName.current.value)
      }}>동작하기</button>

      {/* --------------------------------------------------------------- */}
      <h3>MyCounter</h3>
      <MyCounter></MyCounter>
      <h3>MyCounter2</h3>
      <MyCounter2></MyCounter2>
      <h3>YourCounter</h3>
      <YourCount></YourCount>
      <Friends></Friends>
    </div>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;