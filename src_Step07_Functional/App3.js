// App.css 적용하기 (내부 css)
import { useState } from 'react';
import './App.css'

//함수형 component
function App() {
    // string 과 array 를 상태값으로 관리하기 
    const [state, setState]=useState({
        names:[],
        seq:0
    })
    
    //input 요소의 참조값을 담을변수
    let inputName=null

    return (
        <div className="container">
        <h1>인덱스 페이지 입니다</h1>
        <input ref={(refValue)=>{inputName=refValue}} type="text"  placeholder='이름 입력...'/>
        <button onClick={()=>{
            setState({
                ...state,
                names:state.names.concat({
                    name:inputName.value,
                    seq:state.seq+1
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