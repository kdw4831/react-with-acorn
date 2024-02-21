
/*
    useEffect(()=>{
        //여기는 component가 활성화 될때 실행되는 영역
        return ()=>{
            //여기는 component가 비활성화 될때 실행되는 영역
        }
    },[])
*/

import { useEffect } from "react"


//함수형 컴포넌트는 부모 component는 component가 전달한 props가 매개변수애  Object type

function Fortune2({msg}){
    useEffect(()=>{
        console.log("Fortune2 활성화 됨")
        return ()=>{
            console.log("fortune2 비활성화됨")
        }
    },[])
    return(
        <p>
            오늘의 운세입니다.
            <strong>{msg}</strong>
        </p>
        
    
    )
}

export default Fortune2