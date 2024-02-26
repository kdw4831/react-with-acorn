// App.css 적용하기 (내부 css)
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { useRef } from 'react';
import AComponent from './components/Acomponent';


//함수형 component
function App() {
  
  // redux store 에서 관리되는 state 얻어내기
  const userName = useSelector((state)=>{
    //함수에서 리턴하는 값이 useSelector()함수의 리턴 값이다.
    return state.userName 
  })

  const dispatch=useDispatch();
  const inputName=useRef()
  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
      <p>사용자 명: <strong>{userName}</strong></p>
      <input ref={inputName} type="text" placeholder='사용자명 입력...' />
      <button onClick={()=>{
        //redux store에서 관리되는 상태를 수정하기 위해서는 action을 dispatch 해야한다.
        const action={
          type:"UPDATE_USER",
          payload:inputName.current.value   //숫자일수도 오브젝트일수도 어레이 일수도
        }
        dispatch(action)
      }}>사용자명 수정하기</button>
      <AComponent></AComponent>
    </div>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;