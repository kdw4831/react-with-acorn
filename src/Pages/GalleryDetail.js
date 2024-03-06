// src/pages/GalleryDetail.js

import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, Modal, Pagination } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Form, Link, useNavigate, useParams } from "react-router-dom"
import ConfirmModal from "../components/ConfirmModal"

export default function GalleryDetail(){
    // "/gallery/:num" 에서 num 에 해당하는 경로 파라키터 값 읽어오기
    const {num}=useParams()
    //gallery 하나의 정보를 상태값으로 관리 
    const [state, setState]=useState(null)
    //삭제 모달을 띄울지 여부를 상태값으로 관리
    const [modalShow, setModalShow]= useState(false)

    //로그인된 사용자명이 store 에 있는지 읽어와 본다. 
    const userName=useSelector(state=>state.userName)
    const navigate=useNavigate()

    // const [formShow, setFormShow]=useState(false);

    useEffect(()=>{
        axios.get("/gallery/"+num)
        .then(res=>{
            console.log(res.data)
            setState(res.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }, [num]) //경로 파라미터가 변경될때 서버로 부터 데이터를 다시 받아오도록 한다. 
    const handleYes=()=>{
        // state num에 해당되는 gallery 정보를 삭제하고
        axios.delete("/gallery/"+state.num)
        .then(res=>{
            //gallery 목록 보기로 이동
            navigate("/gallery")
        })
        .catch(error=>{
            console.log(error)
        })

    }
    return (
        <>
            <h3>Gallery 자세히 보기 페이지</h3>
            { state && 
                <>
                    <Pagination>
                        <Pagination.Item disabled={state.prevNum === 0} as={Link} to={"/gallery/"+state.prevNum}>&larr; Prev</Pagination.Item>
                        <Pagination.Item disabled={state.nextNum ===0} as={Link} to={"/gallery/"+state.nextNum}>Next &rarr;</Pagination.Item>
                    </Pagination>
                    <Card>
                        <Card.Img variant="top" src={`/upload/images/${state.saveFileName}`}/>
                        <Card.Body>
                            <Card.Text>{state.caption}</Card.Text>
                            <Card.Text>writer : <strong>{state.writer}</strong></Card.Text>
                            <Card.Text>{state.regdate}</Card.Text>
                            {/*로그인이 된 사용자와 글 작성자가 같으면 삭제 버튼을 제공한다.*/}
                            { userName === state.writer && <Button variant="danger" num={state.num} onClick={()=>{
                                setModalShow(true)
                            }} >삭제</Button> }
                        </Card.Body>
                    </Card>
                    <ConfirmModal show={modalShow} msg="삭제하시겠습니까?" yes={handleYes} no={()=>{
                        setModalShow(false)
                    }}/>
                </>
            }
             {/* <DeleteModal show={formShow} setShow={setFormShow}/> */}
        </>
    )
}

// function DeleteModal(props){
//     const deleteGallery=()=>{
//         axios.get("/gallery/"+props.num)
//         .then(res=>{
//             props.setShow(false)
//         })
//         .catch(error=>{
//             console.log(error)
//         })
//     }

//     return(
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//             onHide={()=>{ 
//                 //props 로 전달받은 함수를 이용해서 Modal 을 숨기기
//                 props.setShow(false)
//             }}
//         >
//             <Modal.Header closeButton>
//             <Modal.Title id="contained-modal-title-vcenter">
//             삭제 모달 창
//             </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
                
//                 <Form.Control> 정말로 삭제하시겠습니까</Form.Control>
                
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="danger" onClick={deleteGallery}>삭제</Button>
//                 <Button variant="primary"> 취소</Button>
//             </Modal.Footer>
//         </Modal>
//     )

// }