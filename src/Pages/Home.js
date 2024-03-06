//src/pages/Home.js

import axios from "axios"
import { useEffect, useState } from "react"
import { ListGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function Home(){

    const [notice,setNotice] =useState([])

    //redux store로 부터 로그인 여부 얻어오기
    const isLogin = useSelector(state=>state.isLogin) 

    useEffect(()=>{
        console.log("Home.js의 useEffect()에 전달할 함수 호출됨!")
        if(!isLogin)return
        //공지사항 받아오기
        axios.get("/notice")
        .then(res=>setNotice(res.data))
        .catch(error=>console.log(error))
    }, [isLogin ])  //state로 관리되는 값이 변경되었을 때 useEffect() 안에 전달된 함수가 호출되게 하기

    return(
        <>
            <h1>인덱스 페이지 입니다.</h1>
            <p>로그인 여부 {JSON.stringify(isLogin)}</p>
            <ul>
                <li><Link to="/editor">smartEditor 테스트</Link></li>
                <li><Link to="/book">query Param 테스트</Link></li>
                <li><Link to="/transition">react 트렌지션 테스트</Link></li>
                
            </ul>

            <h2>공지사항</h2>
            <ListGroup as="ol" numbered>

            {notice.map((item,index)=> <ListGroup.Item key={index}>{item}</ListGroup.Item>)}
            </ListGroup>
            
        </>
    )
}