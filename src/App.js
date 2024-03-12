import { useLocation, useOutlet } from "react-router-dom";
import { Alert, Button, FloatingLabel, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRef, useState } from "react";
import { decodeToken } from "jsontokens";
import 'bootstrap/dist/css/bootstrap.css';
import BsNavbar from "./components/BsNavBar";
import 'animate.css';
import { CSSTransition, SwitchTransition } from "react-transition-group";



//함수형 component
function App() {

  //로그이 여부(유효한 토큰이 존재하는지 여부) 알아내기 
  const isLogin = useSelector(state => state.isLogin)
  
  //라우트된 정보를 출력해주는 Hook
  const currentOutlet =useOutlet()

  //현재 위치(경로) 정보를 얻어낼 수 있는 Hook
  const location=useLocation()
  
  //참조값 관리를 위한 Hook
  const nodeRef=useRef()
  //transition 클래스 정보
  const tranClass={
    enter:"animate__animated",
    enterActive:"animate__fadeIn",
    exit:"animate__animated",
    exitActive:"animate__fadeOut"
  }
  
  return (
    <>
    <BsNavbar/>
    <div className="container">
        <SwitchTransition mode="out-in">
          {/* "out-in" 사라지고 들어오기 | "in-out" 들어오고 사라지기 */}
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={500}
            classNames={tranClass}
            unmountOnExit
          >
          {
            (state)=>(<div ref={nodeRef}>{currentOutlet}</div>)
          }
          </CSSTransition>
        </SwitchTransition>

      
      <LoginModal show={!isLogin}></LoginModal>
    </div>




 {/* <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/members">Member</NavLink></li>
      </ul> */}

     

      {/* <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/members" element={<Member/>}/>
        <Route path="/members/new" element={<MemberForm/>}/>
        <Route path="/members/:num/edit" element={<MemberUpdateForm/>}/>
        <Route path="/editor" Component={EditorComponent}/>
        <Route path="/gallery" Component={Gallery}/>
        <Route path="/gallery/:num" Component={GalleryDetail}/>
        <Route path="/book" Component={Book}/> 
        <Route path="/transition" Component={Transition}/>
        <Route path="/transition2" Component={Transition2}/>
      </Routes> */}
    </>
  );
}


//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;

function LoginModal(props) {
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
          //토큰에 저장된 주제(subject) 얻어내기
          const userName=result.payload.sub

          //userName 를 수정하는 dispatch
          dispatch({type:"UPDATE_USER", payload:userName})

          //axios의 header에 인증 정보를 기본으로 가지고 갈 수 있도록 설정한다.
          axios.defaults.headers.common["Authorization"]="Bearer+"+localStorage.token
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
      centered>
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






