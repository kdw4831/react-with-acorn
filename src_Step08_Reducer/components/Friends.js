//src/components/Friends.js

import { useReducer, useRef } from "react"


const reducer = (state,action)=>{
    let newState
    //action은 {type:xxx,payload:xxx}형식의 object이다.
    if(action.type === "add"){
        //state는 배열인데 기존의 배열에 새로운 아이템이 추가한 배열을 얻어낸다.
        newState = state.concat(action.payload)
    }else if(action.type === "remove"){
        newState = state.filter(item =>item !==action.payload)
    }else{
        newState=state
    }
    return newState
}

function Friends(){
    const [state,dispatch]=useReducer(reducer,[])
    const inputName=useRef()

    return (
        <div>
            <input ref={inputName} type="text" />
            <button onClick={()=>{
                dispatch({
                    type:"add",
                    payload:inputName.current.value
                })
            }}>친구추가</button>
            <button onClick={()=>{
                dispatch({
                    type:"remove",
                    payload:inputName.current.value
                })
            }}>친구제거</button>
            <ul>
                {state.map(item=> <li>{item}</li>)}
            </ul>
        </div>
    )
}

export default Friends