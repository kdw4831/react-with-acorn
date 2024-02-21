//src/components/Todo2.js

import { useEffect } from "react"

/*
    함수형 components가 활성화 되는 시점에 원하는 동작이 있다면 
    useEffect hook을 사용해야한다.

    -사용법

    useEffect(함수,빈배열)

    useEffect(()=>{
        여기는 component가 활성화 되는 시점에 한번 실행됨
    },[])
*/ 

function Todo2(){
    
    useEffect(()=>{
        console.log("Todo2 component가 활성화 되었습니다")
    },[])

    return(
        <div>
            <h3>할 일 목록</h3>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>내용</th>
                        <th>달성</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}

export default Todo2