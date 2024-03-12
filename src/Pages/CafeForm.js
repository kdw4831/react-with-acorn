// src/pages/CafeForm.js

import { useEffect, useRef, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { initEditor } from "../editor/SmartEditor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CafeForm(){
    //입력한 내용을 얻어오기 위한 useRef()
    const inputTitle=useRef();
    const inputContent=useRef();
    //SmartEditor 에 작성한 내용을 textarea 의 value 로 넣어 줄때 필요한 함수가 editorTool 이다 
    const [editorTool, setEditorTool] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        //initEditor() 함수를 호출하면서 SmartEditor 로 변환할 textarea 의 id 를 전달하면
      //textarea 가 SmartEditor 로 변경되면서 에디터 tool 객체가 리턴된다.  
      setEditorTool(initEditor("content"));
    }, [])
    return (
        <>
            <h1>새글 추가 양식 입니다</h1>
            <Form>
                <FloatingLabel
                 label="제목"
                 className="mb-3"
                 controlId="title">
                    <Form.Control ref={inputTitle} type="text" placeholder="제목입력..."/>
                </FloatingLabel>
                <Form.Group className="mb-3" controlId="content">
                    <Form.Label>내용</Form.Label>
                    <Form.Control ref={inputContent}  as="textarea" rows="10"/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e)=>{
                    e.preventDefault()
                    //에디터 tool 을 이용해서 SmartEditor 에 입력한 내용을 textarea 의 value 값으로 변환
                    editorTool.exec();
                    //입력한 제목과 내용을 읽어온다 
                    const title=inputTitle.current.value
                    const content=inputContent.current.value
                    axios.post("/cafes", {title, content})
                    .then(res=>{
                        alert("저장했습니다")
                        navigate("/cafes")
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                }}>저장</Button>
                
            </Form>
        </>
    )
}