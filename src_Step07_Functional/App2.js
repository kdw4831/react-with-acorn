// App.css 적용하기 (내부 css)
import { useState } from 'react';
import './App.css'

//함수형 component
function App() {
    // string 과 array 를 상태값으로 관리하기 
    const [state, setState]=useState({
        inputName:'', 
        names:[],
        seq:0
    })

    return (
        <div className="container">
        <h1>인덱스 페이지 입니다</h1>
        <input type="text" onChange={(e)=>{
            //setState 함수를 이용해서 상태값을 변경한다 
            setState({
                ...state, //기존의 state 값을 펼쳐 놓고 
                inputName:e.target.value //수정할 state 만 수정한다 
            })
        }} placeholder='이름 입력...'/>
        <button onClick={()=>{
            setState({
                ...state,
                 //배열의 concat이라는 함수를 이용해서 현재 입력한 내용이 추가된 새로운 배열을 얻어낸다.
                names:state.names.concat({
                    name:state.inputName,
                    seq:state.seq
                }),
                seq:state.seq+1,
                
            })
        }}>추가</button>
        <ul>
            {/* item 은 {name:"xxx", seq:x } 형태의 object 이다  */}
            {state.names.map(item => <li key={item.seq}>{item.name}</li>)}
        </ul>
        </div>
    );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;