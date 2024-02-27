//src/pages/Home.js

import axios from "axios"
import { useEffect, useState } from "react"
import { ListGroup } from "react-bootstrap"

export default function Home(){

    const [notice,setNotice] =useState([])
    useEffect(()=>{
        //공지사항 받아오기
        axios.get("/notice")
        .then(res=>setNotice(res.data))
        .catch(error=>console.log(error))
    }, [])

    return(
        <>
            <h1>인덱스 페이지 입니다.</h1>
            <h2>공지사항</h2>
            <ListGroup as="ol" numbered>

            {notice.map((item,index)=> <ListGroup.Item key={index}>{item}</ListGroup.Item>)}
            </ListGroup>
            
        </>
    )
}