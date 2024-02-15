//src/components/YourCount.js
//reducer(차원을 감소 시키는?)함수 만들기  

import { useReducer } from "react"



// 현재 state와 action을 전달받아서 새로운 state 값을 리턴해주는 함수
const reducer = (state,action)=>{
  let newState
  if(action==="minus"){
    newState={
        ...state,
        count:state.count-1
    }
  }else if(action==="plus"){
    newState = {
        ...state,
        count:state.count+1
    }
  }else{
    newState=state
  }
  return newState
}

function YourCount(){
    /*
        [상태값, 상태를 변경할 때 사용할 함수] = useReducer(리듀수 함수, 초기값)
    */
    const[state,dispatch] =useReducer(reducer,{count:0})
    
    return(
        <div>
            <button onClick={()=>{
                //"minus" action을 발행해서 상태값을 변경시킨다.
                dispatch("minus")
            }}> - </button>
            <strong>{state.count}</strong>
            <button onClick={()=>{
                //"plus" action을 발행해서 상태값을 변경시킨다.;ㅣ
                dispatch("plus")
            }}> + </button>
        </div>
    )
}

export default YourCount