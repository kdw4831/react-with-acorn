//src/pages/Transition4.js

import { createRef, useRef, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './css/transition4.css'

//uuid로 부터 v4 함수(uuid 값을 리턴해주는 함수)를 import 해서 uuid라는 이름으로 사용하기
import {v4 as uuid} from 'uuid';
import { Button } from "@mui/material";



export default function Transition4(){
    const result=uuid()
    console.log(result)

    const[msgs,setMsgs]=useState([])
    //input 요소의 참조값을 얻기 위해
    const inputRef=useRef()
    return(
        <>
            <input ref={inputRef} type="text" />
            <button onClick={()=>{
                //입력한 메세지가 추가된 새로운 배열을 얻어내서 상태값을 변경한다.
                const obj={
                    id:uuid(),
                    text:inputRef.current.value,
                    nodeRef:createRef(null) //각각의 CSSTransition의 참조값을 관리하기 위해
                }
                setMsgs([...msgs,obj])
                }}>목록 추가</button>
            <h3>알림 목록입니다.</h3>
            <ListGroup>
                <TransitionGroup>
                {msgs.map(item=>(
                    <CSSTransition 
                        key={item.id}
                        nodeRef={item.nodeRef}
                        timeout={500}
                        classNames="fade2"
                        >
                            
                        <ListGroup.Item ref={item.nodeRef} className="d-flex justify-content-between">
                            {item.text}
                          <Button onClick={()=>{
                            const newArray=msgs.filter(it=>it.id !== item.id)
                            setMsgs(newArray)
                          }}>x</Button>
                        
                        </ListGroup.Item>

                   
                    </CSSTransition>
                ))}
                </TransitionGroup>      
            </ListGroup>
        </>
    )
}