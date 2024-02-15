// App.css 적용하기 (내부 css)
import { useRef, useState } from 'react';
import './App.css'

//함수형 component
function App() {
    // string 과 array 를 상태값으로 관리하기 
    const [state, setState]=useState({
        names:[],
        seq:0
    })
    
    //useRef() 훅 사용하기
    //useRef() 함수는 object를 리턴해주는데 리턴해주는 값을 담을 변수의 이름은 마음대로 짓는다.
    let inputName=useRef()

    return (
        <div className="container">
        <h1>인덱스 페이지 입니다</h1>
        <input ref={inputName} type="text"  placeholder='이름 입력...'/>
        <button onClick={()=>{
            setState({
                ...state,
                names:state.names.concat({
                    name:inputName.current.value,
                    seq:state.seq+1
                }),
                seq:state.seq+1,
                
            })
            //input 요소에 빈 문자열 출력하기
            inputName.current.value=""
            //input 요소에 포커스 주기
            inputName.current.focus()
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