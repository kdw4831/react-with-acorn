import axios from "axios";
import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function MemberUpdateForm() {
  const {num} = useParams()
  //수정할 회원의 정보를 state로 관리
  const [state, setState] = useState({
    num:0,
    name:"",
    addr:""
  })

  useEffect(() => {
    axios.get("/members/" + num)
    .then(res => {
      setState(res.data)
    })
    .catch(error => console.log(error))
  },[])

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }
  const navigate = useNavigate()
  const handleSave = () => {
    axios.put("/members/" + num,state)
    .then(res => {
      //회원 목록 보기로 이동 
      navigate("/members")
    })
    .catch(error => console.log(error))
  }
  return (
    <>
      <h2>회원 정보 수정 양식</h2>
      <FloatingLabel controlId="name" label="이름" className="mb-3">
        <Form.Control onChange = {handleChange} value = {state.name} name="name" type="text" placeholder="input your name..."/>
      </FloatingLabel>
      <FloatingLabel controlId="addr" label="address" className="mb-3">
        <Form.Control onChange = {handleChange} value={state.addr} name="addr" type="text" placeholder="input your address"/>
      </FloatingLabel>
      <Button variant="success" onClick={handleSave}>confirm</Button>
    </>
  )
}