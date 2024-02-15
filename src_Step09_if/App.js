// App.css 적용하기 (내부 css)
import { useState } from 'react';
import './App.css'

//함수형 component
function App() {

  //로그인 여부를 관리할 state
  const[isLogin,setLogin]=useState(false)
  //선택된 무기를 관리할 state
  const[weapon, setWeapon]=useState('sword')
  function getComment(){
    if(weapon === "gun"){
      return <p>총으로 공격해요</p>
    }else if(weapon === "sword"){
      return <p>칼로 공격해요</p>
    }else if(weapon === "arrow"){
      return <p>활로 공격해요</p>
    }
  }

  const comment={
    gun:<p>총으로 공격해요</p>,
    sword:<p>칼로 공격해요</p>,
    arrow:<p>활로 공격해요</p>
  }

  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
      <button onClick={()=>{
        setLogin(true)
      }}>테스트 로그인</button>
      {/* null은 react가 출력하지 않는다*/}
      {isLogin ? null :<p>로그인이 필요합니다1</p>}
      {!isLogin ? <p>로그인이 필요합니다2</p>:null}
      {!isLogin && <p>로그인이 필요합니다3</p>}
      <p>로그인이 필요합니다.</p>
      <select value={weapon} onChange={(e)=>{
        //선택한 value 값으로 false를 변경해 주어야 select의 value 값이 변경된다.
        setWeapon(e.target.value)
      }}>
        <option value="gun">총</option>
        <option value="sword">칼</option>
        <option value="arrow">활</option>
      </select>
        {weapon === "gun" && <p>총으로 공격합니다.</p>}
        {weapon === "sword" && <p>칼로 공격합니다</p>}
        {weapon === "arrow" && <p>활로 공격합니다</p>}
        <br />
        {getComment()}
        <br />
        {comment[weapon]}
        
        
        
      
    </div>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;