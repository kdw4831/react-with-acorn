// src/components/BsNavbar.js

import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export default function BsNavbar(){
    //로그인 된 사용자명이 store에 있는지 읽어와 본다.
    const userName=useSelector(state=>state.userName)
    const dispatch =useDispatch()
    const navigate= useNavigate()


    //로그아웃 버튼을 눌렀을 때 호출되는 함수 
    const handleLogout= ()=>{
        delete localStorage.token
        dispatch({type:"UPDATE_USER" ,payload:null})
        dispatch({type:"SET_LOGIN", payload:false})
        navigate("/ ")
    }
    return(
        <Navbar expand="md" className="bg-warning">
            <Container>
                <Navbar.Brand href="/">Acorn</Navbar.Brand>
                <Navbar.Toggle area-controls="one"/>
                <Navbar.Collapse id="one">
                    <Nav className="me-auto">
                        
                        <Nav.Link as={NavLink} to="/members">Member</Nav.Link>
                        <Nav.Link as={NavLink} to="/gallery">Gallery</Nav.Link>
                        <Nav.Link as={NavLink} to="/cafes">Cafe</Nav.Link>
                    </Nav>
                    {/* store에 userName이 null이 아니면 userName을 출력 아니면 로그인 버튼 출력*/ }
                    {userName ?
                        <>
                            <Nav>
                                <Nav.Link as={NavLink}>{userName}</Nav.Link>
                                <span className="navbar-text">Signed in</span>
                            </Nav>
                            <Button onClick={handleLogout} className="ms-2" variant="outline-primary">Logout</Button>
                            
                        </>
                        :
                        <Button variant="outline-success">Sign in</Button>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}