// src/pages/Transition.js

import { useRef, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
//css 를 import 해서 적용되도록 한다 
import './css/transition1.css'


export default function Transition(){
    // inProp 라는 상태값을 하나 관리한다. 초기값은 false
    const [inProp, setInProp] = useState(false)
    // 문서 객체의 참조값을 관리하기 위한 useRef() 
    const nodeRef = useRef(null)
    //알림 메세지를 보이게 할지 여부
    const [showMessage, setShowMessage]=useState(false)

    const [boxShow,setBoxShow]= useState(false)

    const transClass={
        enter:"on-start",  //enter 될때 추가할 클래스의 이름
        enterActive:"on-end", //enter-active 될때 추가할 클래스의 이름
        enterDone:"on-done", //enter가 끝났을 때 추가할 클래스의 이름
        exit:"off-start",
        exitActive:"off-end",
        exitDone:"off-done"
    }

    return (
        <>
            <h3>React Transition Group</h3>
            <p>
                페키지 설치 <code>npm install react-transition-group</code>
            </p>
            <CSSTransition  nodeRef={nodeRef}
                 in={inProp} 
                 timeout={400} 
                 unmountOnExit 
                 classNames="gura">
                <div ref={nodeRef}>
                    Css Transition!!
                </div>
            </CSSTransition>
            <Button onClick={()=>{
                setInProp(true)
            }}>set true</Button>
            <Button onClick={()=>{
                setInProp(false)
            }}>set false</Button>

            <hr/>
            <Button onClick={()=>setShowMessage(true)}>알림 띄우기</Button>        
            <CSSTransition 
                nodeRef={nodeRef} 
                in={showMessage}
                timeout={400}
                classNames="monkey"
                unmountOnExit
            >
                <Alert 
                    ref={nodeRef} 
                    variant="success" 
                    dismissible
                    onClose={()=>setShowMessage(false)}
                >
                    <Alert.Heading>알림</Alert.Heading>
                    <p>
                        성공 했습니다
                    </p>
                    <Button onClick={()=>setShowMessage(false)}>확인</Button>
                </Alert>
            </CSSTransition>
            <br />
            <br />
            <Button variant="info" onClick={()=>{
                //boxShow 값을 toggle 시킨다.
                setBoxShow(!boxShow)
            }}>토글</Button>
            
            <br />
            <CSSTransition in={boxShow} 
                unmountOnExit
                timeout={400}>
                <div className="box">box</div>
            </CSSTransition>

            <div style={{height:"300px"}} ></div>
        </>
    )
}