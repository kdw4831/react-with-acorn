
// npm install bootstrap 해서 설치가 되어 있다면 bootstrap css 를 사용할수 있다.
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import { decodeToken } from 'jsontokens';
import { useEffect, useState } from 'react';
import { Alert, Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export default function App2(){
    const dispatch = useDispatch()
    //페이지 로딩시점에 token 확인!
    useEffect(()=>{
        if(localStorage.token){
            //토큰을 디코딩
            const result=decodeToken(localStorage.token);
            //초단위
            const expTime=result.payload.exp*1000; // *1000 을 해서 ms 단위로 만들고 
            //현재시간
            const now=new Date().getTime();
            //만일 유효기간이 만료 되었다면 
            if(expTime < now){
                dispatch({type:"SET_LOGIN", payload:false})
            }else{//유효기간이 만료 되지 않았다면 로그인된 상태라고 간주!
                dispatch({type:"SET_LOGIN", payload:true})
                dispatch({type:"UPDATE_USER", payload:result.payload.sub})
            }
        }
    }, [])

    const isLogin = useSelector(state => state.isLogin)
    const userName = useSelector(state => state.userName)

    const handleLogout= ()=>{
        //localStorage에 저장된 토큰 삭제
        delete localStorage.token
        //store의 상태 바꾸기 
        dispatch({type:"SET_LOGIN",payload:false})
    }

    return (
        <div className="container">
            <h1>인덱스 페이지 입니다</h1>
            {
                isLogin && <p> <strong>{userName}</strong> 님 로그인중... <button onClick={handleLogout}>로그아웃</button></p>
            }
            <MyModal show={!isLogin}></MyModal>
        </div>
        
    )
}

function MyModal(props) {
    //입력한 userName 과 password 를 상태값으로 관리
    const [state, setState]=useState({})
    const [isError, setError]=useState(false)

    //input 요소에 문자열을 입력했을때 호출되는 함수 
    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const dispatch=useDispatch()
    //로그인 버튼 눌렀을때 실행할 함수 
    const handleSubmit = ()=>{
        axios.post("/auth", state)
        .then(res=>{
            //로그인 성공이면 여기가 실행되면서 JWT 가 발급되고 
            console.log(res.data)
            //토큰을 localStorage 에 저장
            localStorage.token=res.data
            //모달창을 숨기고
            dispatch({type:"SET_LOGIN", payload:true})
            //에러 정보를 없앤다
            setError(false)
            //토큰을 디코딩해서 사용자 정보를 얻어온다
            const result=decodeToken(localStorage.token)
            //토큰 말료시간
            const expTime=result.payload.exp*1000 //초단위를 ms 초로 바꾸기위해 
            //현재시간
            const now=new Date().getTime() // 현재 시간을 ms 초 단위로 얻어내기
            //토큰에 저장된 주제(subject) 얻어내기
            const userName=result.payload.sub

            //userName 를 수정하는 dispatch
            dispatch({type:"UPDATE_USER", payload:userName})
        })
        .catch(error=>{ 
            //아이디 혹은 비밀번호가 클리면 여기가 실행된다.
            setError(true)
        })
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            로그인이 필요 합니다.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="User Name" className="mb-3">
            <Form.Control onChange={handleChange}  name="userName" type="text"  placeholder="User Name"/>
          </FloatingLabel>
          <FloatingLabel  controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
          </FloatingLabel>
          {
            isError && <Alert variant='danger'>아이디 혹은 비밀 번호가 틀려요</Alert>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>로그인</Button>
        </Modal.Footer>
      </Modal>
    );
  }