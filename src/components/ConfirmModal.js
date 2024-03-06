import { useState } from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";



export default function ConfirmModal(props){
    const handleYes=()=>{
        //props로 전달된 yes 함수를 호출한다.
        props.yes()
      
    }
    const handleNo=()=>{
        props.no()

    }
    return(
        <>
            <Modal {...props}>
                <Modal.Header>알림</Modal.Header>
                <ModalBody>{props.msg}</ModalBody>
                <Modal.Footer>
                    <Button variant="success" onClick={handleYes}>확인</Button>
                    <Button variant="danger" onClick={handleNo}>취소</Button>
                </Modal.Footer>
            </Modal>
        </>
        )
}