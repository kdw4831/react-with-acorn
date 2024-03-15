//src/pages/RefTest.js

import axios from "axios"
import { createRef, useEffect, useRef, useState } from "react"


export default function RefTest(){
    //{current:undefined}
    const divRef=useRef()
    console.log(divRef)
    //각각의 item 들이 li의 참조값을 담을 object를 하나씩 가지도록한다.
    const friends=[
        {num:1,name:"김구라", ref:createRef()},
        {num:2,name:"해골", ref:createRef()},
        {num:3,name:"원숭이", ref:createRef()}
    ]
    //Cafe글 목록
    const [list, setList]=useState([])
    useEffect(()=>{
        axios.get("/cafes?pageNum=1")
        .then(res=>{
            //map 함수를 이용해서 {..., ref:createRef()가 추가된 새로운 배열을 얻어낸다.}
            const result=res.data.list.map(item=>{
                item.ref=createRef()
                return item
            })
            setList(result)
        })
        .catch(error=>{
            console.log(error)
        })
    })
    return(
        <>
            <h1>Ref 테스트</h1>
            <button onClick={()=>{
                /*
                 divRef 안에는 current라는 방이 있고 거기에는 아래 div의 참조값이 들어있다
                */
               divRef.current.style.display="none" 
            }}>눌러보셈</button>
            <div className="box" ref={divRef}>box1</div>
            <div className="box" ref={divRef}>box2</div>
            <ul>
                {friends.map(item=>(
                    <li key={item.num} ref={item.ref}>
                        번호:<strong>{item.num}</strong>
                        이름:<strong>{item.name}</strong>
                        <button onClick={()=>{
                            item.ref.current.style.backgroundColor="yellow"
                        }}>선택</button>
                    </li>
                ))}
            </ul>

            <h3>글 목록</h3>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>작성자</th>
                        <th>제목</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(item=>(
                            <tr key={item.num} ref={item.ref}>
                                <td>{item.num}</td>
                                <td>{item.writer}</td>
                                <td>{item.title}</td>
                                <td><button onClick={()=>{
                                    item.ref.current.style.backgroundColor="yellowgreen"
                                }}>선택</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}