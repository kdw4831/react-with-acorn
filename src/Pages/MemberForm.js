
import { Button } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import {  useNavigate } from "react-router-dom"

//src/pages/MemberForm.js
export default function MemberForm(){
    // 라우트 페이지 이동을 도와주는 함수
    const navigate =useNavigate()
    
    //입력한 글 내용을 state로 관리하기
    const[state,setState]=useState([])
    //handleChange 함수에서 입력한 글 내용을 일괄 관리한다.
    const handleChange=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    //스테이트는 오브젝트니까 알아서 json으로 변환되겠지
    const handleSave =()=>{
        //state object의 내용을 전송한다
        axios.post("/members",state)
        .then(res=>{
            if(res.data.isSuccess){
                alert("추가 했습니다");
                //글 목록보기로 이동(javascript로 라우터 이동, useNavigate() Hook이 필요하다)
                navigate("/members")
            }
        })
    }

    return(
        <>
            <h2>새로운 회원 입력 양식</h2>
            <input type="text" name="name" placeholder="이름..." onChange={handleChange} />
            <input type="text" name="addr" placeholder="주소..." onChange={handleChange}/>
            <button onClick={ handleSave}>추가</button>

            <Form>
                <Form.Group as={Row} className="mb-3" controlId="name">
                    <Form.Label column sm="2">이름</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="이름 입력..."/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="addr">
                    <Form.Label column sm="2">주소</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="주소 입력..." />
                    </Col>
                </Form.Group>
                <Button variant="outlined" onClick={handleSave}>추가</Button>
            </Form>
        </>
    )
}