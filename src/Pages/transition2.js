//src/pages/Transition2.js
//css 로딩
import { Button } from 'react-bootstrap'
import './css/transition2.css'
//npm install animate.css해서 설치한 css 로딩하기 
import 'animate.css'
import { CSSTransition } from 'react-transition-group'
import { useState } from 'react'

export default function Transition2(){
    const[boxShow,setBoxShow]=useState(false)
    /*
        cssTransition 컴포넌트에 classNames 속성에 넣어 줄 object
        enter 혹은 exit 될대 우리가 정의한 클래스 속성값이 자동으로 추가 되도록하는 
        object
    */ 
    const tranClass={
        enter:"animate__animated",
        enterActive:"animate__backInUp",
        exit:"animate__animated",
        exitActive:"animate__backOutUp"
    }

    return(
        <>
            <h3>CssTransition +animate.css 활용</h3>
            <Button onClick={()=>setBoxShow(!boxShow)}>토글</Button>
            <CSSTransition 
                classNames={tranClass}
                in={boxShow}
                timeout={1000}
                unmountOnExit  
            >
            <div className='box'></div>
            </CSSTransition>
          

  
        </>
    )
}