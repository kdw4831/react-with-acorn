// App.css 적용하기 (내부 css)
import { useState } from 'react';
import './App.css'

//함수형 component
function App() {
  /*
    - useState() 함수는 배열을 리턴한다
    - [ 상태값, 상태값을 바꿀 함수 ] 구조이다
    - useState(상태의 초기값)
  */
  const [count, setCount]=useState(0)
  const [state, setState]=useState({
    count:0
  })
  return (
    <div className="container">
        <h1>인덱스 페이지 입니다</h1>
        <button onClick={()=>{
          // 버튼을 눌렀을 때 상태값을 바꾸는 함수를 이용해서 상태값을 변경해 준다.
          setCount(count+1)
        }}>{count}</button>
        <button onClick={()=>{
          setState({
            count:state.count+1
          })
        }}>{state.count}</button>
    </div>      
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할 수 있다. (src/index.js)
export default App;